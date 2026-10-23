export const STORAGE_KEY = 'recall.progress.v1';
export const DAY = 86400000;
export const emptyState = () => ({version: 1, problems: {}, lessons: {}, answers: {}, activity: []});
export const dateKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
export function validateState(raw, validIds, lessonIds, questionIds) {
  if (!raw || raw.version !== 1 || typeof raw.problems !== 'object' || Array.isArray(raw.problems) || !raw.problems) throw new Error('This is not a Recall v1 backup.');
  const state = emptyState();
  for (const [id,p] of Object.entries(raw.problems)) {
    if (!validIds.includes(id) || !p || !['todo','learning','solved'].includes(p.status)) continue;
    state.problems[id] = {status:p.status, starred:p.starred===true, notes:typeof p.notes==='string'?p.notes.slice(0,10000):'', interval:Number.isFinite(p.interval)?Math.max(0,Math.min(365,p.interval)):0, due:Number.isFinite(p.due)&&p.due>0?p.due:null, reviews:Number.isInteger(p.reviews)?Math.max(0, p.reviews):0};
  }
  for (const [id,value] of Object.entries(raw.lessons || {})) if(lessonIds.includes(id) && value===true) state.lessons[id]=true;
  for (const [id,value] of Object.entries(raw.answers || {})) if(questionIds.includes(id)&&typeof value==='string') state.answers[id]=value.slice(0,10000);
  state.activity = Array.isArray(raw.activity)?[...new Set(raw.activity.filter(x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)))].slice(-730):[];
  return state;
}
export function reviewProblem(previous = {}, rating, now = Date.now()) {
  if (!['again','hard','good','easy'].includes(rating)) throw new Error('Unknown review rating');
  const old = previous.interval || 0;
  const interval = rating==='again'?0:rating==='hard'?1:rating==='good'?Math.min(180,Math.max(3,old*2)):Math.min(365,Math.max(7,old*3));
  return {...previous, status:rating==='again'?'learning':'solved', interval, due:now+(rating==='again'?10*60000:interval*DAY), reviews:(previous.reviews||0)+1};
}
export function isDue(progress, now=Date.now()) { return !!progress?.due && progress.due<=now; }
export function streak(activity, now = new Date()) {
  const days = new Set(activity); const day = new Date(now); let count=0;
  if(!days.has(dateKey(day))) day.setDate(day.getDate()-1);
  while(days.has(dateKey(day))) {count++; day.setDate(day.getDate()-1);}
  return count;
}
export function filterProblems(problems, progress, {query='', pattern='All patterns', difficulty='All levels', status='All progress'} = {}) {
  return problems.filter(p=>(!query || `${p.title} ${p.pattern} ${p.cue}`.toLowerCase().includes(query.toLowerCase())) && (pattern==='All patterns'||p.pattern===pattern) && (difficulty==='All levels'||p.difficulty===difficulty) && (status==='All progress'||(status==='Bookmarked'?progress[p.id]?.starred:status==='Due for review'?isDue(progress[p.id]):(progress[p.id]?.status||'todo')===status)));
}
