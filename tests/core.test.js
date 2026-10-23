import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyState,validateState,reviewProblem,isDue,DAY,streak,dateKey,filterProblems} from '../dist/core.js';
import {problems,patterns,lessons,questions} from '../dist/data.js';
import {readFileSync,existsSync} from 'node:fs';

const now = 1700000000000;
const validate = state=>validateState(state,problems.map(p=>p.id),lessons.map(l=>l.id),questions.map(q=>q.id));
test('review ratings schedule correct intervals and preserve personal data',()=>{
 const initial={status:'learning',notes:'Remember complement lookup',starred:true,reviews:2};
 for(const [rating,delay] of [['again',600000],['hard',DAY],['good',3*DAY],['easy',7*DAY]]){
  const p=reviewProblem(initial,rating,now);
  assert.equal(p.due,now+delay);assert.equal(p.reviews,3);assert.equal(p.notes,initial.notes);assert.equal(p.starred,true);
  assert.equal(p.status,rating==='again'?'learning':'solved');
 }
});
test('successful reviews extend intervals and enforce caps',()=>{
 assert.equal(reviewProblem({interval:7},'good',now).interval,14);
 assert.equal(reviewProblem({interval:7},'easy',now).interval,21);
 assert.equal(reviewProblem({interval:200},'good',now).interval,180);
 assert.equal(reviewProblem({interval:200},'easy',now).interval,365);
 assert.equal(reviewProblem({interval:100},'hard',now).interval,1);
 assert.throws(()=>reviewProblem({},'unknown',now));
});
test('due queue boundary is inclusive and ignores unscheduled items',()=>{
 assert.equal(isDue({},now),false);assert.equal(isDue({due:now+1},now),false);
 assert.equal(isDue({due:now},now),true);assert.equal(isDue({due:now-1},now),true);
});
test('streak uses local calendar dates and allows an uncompleted today',()=>{
 const date=new Date(2026,9,23,12),today=dateKey(date);assert.equal(today,'2026-10-23');
 assert.equal(streak(['2026-10-21','2026-10-22',today],date),3);
 assert.equal(streak(['2026-10-21','2026-10-22'],date),2);
 assert.equal(streak(['2026-10-20'],date),0);
 assert.equal(streak(['2026-10-22','2026-10-22'],date),1);
});
test('filters combine query, pattern, difficulty, and progress',()=>{
 const progress={'two-sum':{status:'solved',starred:true}};
 assert.deepEqual(filterProblems(problems,progress,{query:'two sum',pattern:'Hash maps',difficulty:'Easy',status:'solved'}).map(p=>p.id),['two-sum']);
 assert.equal(filterProblems(problems,progress,{status:'Bookmarked'}).length,1);
 assert.equal(filterProblems(problems,progress,{query:'TWO SUM'}).length,1);
 assert.equal(filterProblems(problems,progress,{status:'todo'}).length,39);
 assert.equal(filterProblems(problems,progress,{query:'no such problem'}).length,0);
});
test('backup roundtrip retains supported state',()=>{
 const state=emptyState();state.problems['two-sum']={...reviewProblem({notes:'A < B',starred:true},'good',now)};
 state.lessons.caching=true;state.answers.project='My own contribution';state.activity=['2026-10-23'];
 assert.deepEqual(validate(JSON.parse(JSON.stringify(state))),state);
});
test('backup validation rejects invalid roots and discards unsafe or unknown fields',()=>{
 for(const raw of [null,{},[],{version:2,problems:{}},{version:1,problems:[]}])assert.throws(()=>validate(raw));
 const state=validate({version:1,problems:{unknown:{status:'solved'},'two-sum':{status:'solved',notes:'x'.repeat(12000),interval:-2,due:'yesterday',starred:'yes',reviews:-1,extra:'no'},'valid-anagram':{status:'garbage'}},lessons:{caching:true,unknown:true},answers:{project:42,unknown:'x'},activity:['2026-10-23','2026-10-23','bad',null]});
 assert.equal(Object.keys(state.problems).length,1);assert.equal(state.problems['two-sum'].notes.length,10000);
 assert.equal(state.problems['two-sum'].interval,0);assert.equal(state.problems['two-sum'].due,null);
 assert.equal(state.problems['two-sum'].reviews,0);assert.equal(state.problems['two-sum'].starred,false);
 assert.equal(state.problems['two-sum'].extra,undefined);assert.deepEqual(state.lessons,{caching:true});
 assert.deepEqual(state.answers,{});assert.deepEqual(state.activity,['2026-10-23']);
});
test('curriculum has stable unique IDs and complete source-linked content',()=>{
 assert.equal(problems.length,40);assert.equal(patterns.length,11);assert.equal(lessons.length,6);assert.equal(questions.length,8);
 for(const collection of [problems,lessons,questions])assert.equal(new Set(collection.map(x=>x.id)).size,collection.length);
 for(const p of problems){for(const key of ['title','pattern','cue','solution','time','space','recall'])assert.ok(p[key],`${p.id} missing ${key}`);assert.equal(p.url,`https://leetcode.com/problems/${p.id}/`);}
});
test('PWA assets exist and PNG dimensions match manifest',()=>{
 const root=new URL('../dist/',import.meta.url),manifest=JSON.parse(readFileSync(new URL('manifest.webmanifest',root)));
 assert.equal(manifest.display,'standalone');assert.equal(manifest.start_url,'./');
 for(const entry of manifest.icons){const png=readFileSync(new URL(entry.src,root));assert.equal(`${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`,entry.sizes);}
 for(const name of ['index.html','styles.css','app.js','core.js','data.js','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png'])assert.ok(existsSync(new URL(name,root)));
 const worker=readFileSync(new URL('sw.js',root),'utf8');for(const name of ['app.js','core.js','data.js','styles.css'])assert.ok(worker.includes(name));
});
