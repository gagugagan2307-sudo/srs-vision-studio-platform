(() => {
  'use strict';

  const MEMBERS = [
    'Gagan','Teja Swaroop','Chinmayee','Deepika','Geetha','Sinchana',
    'Gangaraju','Ganesh','Girish','Gagana','Gangothri','Prabhakar','Kushanth'
  ];

  const PLATFORMS = [
    ['whatsapp','🟢','WhatsApp','Business chat & messages','https://web.whatsapp.com/'],
    ['instagram','◎','Instagram','Posts, reels & messages','https://www.instagram.com/'],
    ['whatsapp-channel','◉','WhatsApp Channel','Channel updates','https://www.whatsapp.com/'],
    ['youtube','▶','YouTube','Studio, uploads & comments','https://studio.youtube.com/'],
    ['pinterest','◈','Pinterest','Pins & boards','https://www.pinterest.com/'],
    ['facebook','f','Facebook','Pages & messages','https://www.facebook.com/'],
    ['linkedin','in','LinkedIn','Company & leads','https://www.linkedin.com/'],
    ['telegram','✈','Telegram','Channels & messages','https://web.telegram.org/'],
    ['x','𝕏','X','Posts & messages','https://x.com/']
  ];

  const TOOL_META = {
    'graphic-design': {icon:'✦',title:'Graphic Design',desc:'Design posters, logos, social creatives and brand assets.',stats:['Design projects','Active work','Completed','Value']},
    'ai-tools': {icon:'✧',title:'AI Tools',desc:'One place to launch your AI tools, prompts and assistants.',stats:['Prompt drafts','AI platforms','Saved prompts','Sessions']},
    'social-media': {icon:'◎',title:'Social Media',desc:'Manage platform launchers, content drafts and notifications.',stats:['Connected slots','Draft posts','Unread alerts','Scheduled']},
    'video-tools': {icon:'▶',title:'Video Tools',desc:'Preview, review and prepare video work from a dedicated workspace.',stats:['Video projects','Ready to review','Exports','Storage']},
    'image-tools': {icon:'▧',title:'Image Tools',desc:'Edit images directly in your browser with fast controls.',stats:['Images','Edits','Exports','Drafts']},
    'document-tools': {icon:'▤',title:'Document Tools',desc:'Write, format, save and export documents.',stats:['Documents','Drafts','Exports','Words']},
    'pdf-tools': {icon:'PDF',title:'PDF Tools',desc:'Prepare PDF-ready documents and print/export them.',stats:['PDF jobs','Pages','Exports','Templates']},
    'productivity-tools': {icon:'✓',title:'Productivity',desc:'Tasks, notes and simple work planning in one slot.',stats:['Open tasks','Done','Notes','Focus']},
    'developer-tools': {icon:'</>',title:'Developer Tools',desc:'Write, test and format code snippets locally.',stats:['Snippets','JSON jobs','Projects','Runs']},
    'business-tools': {icon:'₹',title:'Business Tools',desc:'Create invoices, track business notes and client records.',stats:['Invoices','Clients','Pending','Total value']},
    'education-tools': {icon:'⌘',title:'Education Tools',desc:'Notes, flashcards and quick quizzes.',stats:['Notes','Cards','Quiz score','Courses']},
    'entertainment-tools': {icon:'🎮',title:'Entertainment',desc:'Small games and media utilities for a separate workspace.',stats:['Games','Sessions','Scores','Favorites']},
    'utilities-tools': {icon:'⚡',title:'Utilities',desc:'Calculator, text helpers and small everyday tools.',stats:['Tools','Calculations','Saved','Shortcuts']},
    'music': {icon:'♫',title:'Music Player',desc:'Play local music, build a playlist and keep it in a dedicated slot.',stats:['Tracks','Favorites','Queue','Minutes']}
  };

  const DIRECT_AI = [
    ['ChatGPT','https://chatgpt.com/'],
    ['Gemini','https://gemini.google.com/'],
    ['Claude','https://claude.ai/'],
    ['Microsoft Copilot','https://copilot.microsoft.com/'],
    ['Perplexity','https://www.perplexity.ai/']
  ];

  const STORAGE_KEY = 'srsVisionCleanStateV2';
  const SETTINGS_KEY = 'srsVisionCleanSettingsV1';
  const initialState = {
    projects:[
      {name:'Brand Identity',client:'Nova Tech',progress:80,status:'In Progress',due:'2026-10-02',value:28000,member:'Gagan'},
      {name:'Social Media Creative',client:'Bright Mart',progress:60,status:'Planning',due:'2026-10-05',value:16000,member:'Chinmayee'},
      {name:'Poster Design',client:'Green Earth',progress:40,status:'In Progress',due:'2026-10-12',value:9000,member:'Deepika'},
      {name:'Packaging Design',client:'Organic Foods',progress:20,status:'Pending',due:'2026-10-20',value:22000,member:'Gangothri'}
    ],
    team:{name:'SRS VISION',members:MEMBERS.map((name,i)=>({id:'m'+(i+1),name,role:'Team Member',service:'',description:'',skills:'',phone:'',notes:''}))},
    tasks:[{title:'Prepare brand review',done:false,priority:'High'},{title:'Send client proof',done:false,priority:'Medium'},{title:'Update project tracker',done:true,priority:'Low'}],
    notes:[],
    social:{drafts:[],notifications:[{platform:'Instagram',title:'New message received',body:'Connect the Instagram account to receive live events.',time:'Just now'}],connected:{}},
    finance:{transactions:[],transfers:[]},
    files:[],
    calendar:[{title:'Client Review',date:'2026-10-02',time:'11:00',type:'Meeting'},{title:'Poster Delivery',date:'2026-10-12',time:'15:00',type:'Deadline'}],
    invoices:[],
    imageEditor:{},
    document:{title:'',body:''},
    ai:{history:[]},
    music:{playlist:[]}
  };

  let state = loadLocal();
  let settings = loadSettings();
  let route = 'dashboard';
  let currentProject = null;
  let toastTimer = null;
  let currentAudio = null;
  let audioObjectUrl = null;

  const $ = (sel,root=document) => root.querySelector(sel);
  const $$ = (sel,root=document) => [...root.querySelectorAll(sel)];
  const esc = (value='') => String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const initials = (name='') => name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase() || '?';
  const money = n => '₹ ' + Number(n||0).toLocaleString('en-IN');
  const nowDate = () => new Date().toISOString().slice(0,10);

  function deepClone(x){return JSON.parse(JSON.stringify(x));}
  function mergeState(raw){
    const s = deepClone(initialState);
    if(raw && typeof raw==='object'){
      if(Array.isArray(raw.projects))s.projects=raw.projects;
      if(raw.team&&Array.isArray(raw.team.members))s.team={...s.team,...raw.team,members:raw.team.members};
      if(Array.isArray(raw.tasks))s.tasks=raw.tasks;
      if(Array.isArray(raw.notes))s.notes=raw.notes;
      if(raw.social)s.social={...s.social,...raw.social,connected:{...s.social.connected,...(raw.social.connected||{})}};
      if(raw.finance)s.finance={...s.finance,...raw.finance,transactions:Array.isArray(raw.finance.transactions)?raw.finance.transactions:[],transfers:Array.isArray(raw.finance.transfers)?raw.finance.transfers:[]};
      if(Array.isArray(raw.files))s.files=raw.files;
      if(Array.isArray(raw.calendar))s.calendar=raw.calendar;
      if(Array.isArray(raw.invoices))s.invoices=raw.invoices;
      if(raw.document)s.document={...s.document,...raw.document};
      if(raw.ai)s.ai={...s.ai,...raw.ai,history:Array.isArray(raw.ai.history)?raw.ai.history:[]};
      if(raw.music)s.music={...s.music,playlist:Array.isArray(raw.music.playlist)?raw.music.playlist:[]};
    }
    // Normalize the old roster into the current 13-member SRS Vision roster.
    const current=Array.isArray(s.team.members)?s.team.members:[];
    const aliases={
      'gagan r':'Gagan','teja sawaroop':'Teja Swaroop','g m chinmayee':'Chinmayee','deepika n s':'Deepika',
      'sinchana j':'Sinchana','geetha h k':'Geetha','gangaraju k v':'Gangaraju','ganesh k':'Ganesh',
      'girish m s':'Girish','gagana h r':'Gagana','gangothri h r':'Gangothri'
    };
    const byName=new Map();
    current.forEach(m=>{const raw=String(m?.name||'').trim().toLowerCase();const key=aliases[raw]||String(m?.name||'').trim();if(key)byName.set(key.toLowerCase(),m)});
    s.team.members=MEMBERS.map((name,i)=>{
      const old=byName.get(name.toLowerCase());
      return {id:'m'+(i+1),name,role:old?.role||'Team Member',service:old?.service||'',description:old?.description||'',skills:old?.skills||'',phone:old?.phone||'',notes:old?.notes||''};
    });
    s.team.name='SRS VISION';
    return s;
  }
  function loadLocal(){try{const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');return mergeState(raw)}catch{return deepClone(initialState)}}
  function saveLocal(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
  function loadSettings(){try{return JSON.parse(localStorage.getItem(SETTINGS_KEY)||'{"theme":"blue"}')}catch{return {theme:'blue'}}}
  function saveSettings(){localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));}
  function notify(msg){const el=$('#toast');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600)}

  // ---------- Supabase ----------
  function remotePayload(){
    const payload=deepClone(state);
    if(payload.music?.playlist){
      payload.music.playlist=payload.music.playlist.map(x=>({name:String(x.name||'Track'),duration:Number(x.duration||0)}));
    }
    if(Array.isArray(payload.files)){
      payload.files=payload.files.map(x=>({name:String(x.name||''),type:String(x.type||''),size:Number(x.size||0),date:String(x.date||nowDate())}));
    }
    return payload;
  }

  const Live = {
    client:null, session:null, channel:null, retryTimer:null, saveTimer:null,
    status:'local', detail:'', dirty:localStorage.getItem('srsVisionDirty')==='1',
    initPromise:null, writeChain:Promise.resolve(), changeVersion:0, reconnectDelay:1500,
    authBound:false,
    emit(stateText,detail=''){this.status=stateText;this.detail=detail;renderHeaderStatus();},
    async ensureSession(){
      let result=await this.client.auth.getSession();
      if(result?.error) throw result.error;
      let session=result?.data?.session||null;
      if(!session){
        const r=await this.client.auth.signInAnonymously();
        if(r.error) throw r.error;
        session=r.data?.session||null;
      }
      if(!session) throw new Error('Supabase did not return an anonymous session');
      this.session=session;
      try{await this.client.realtime.setAuth(session.access_token)}catch{}
      if(!this.authBound){
        this.authBound=true;
        this.client.auth.onAuthStateChange((_event,nextSession)=>{
          if(nextSession){
            this.session=nextSession;
            setTimeout(()=>this.client?.realtime?.setAuth(nextSession.access_token),0);
          }
        });
      }
      return session;
    },
    async init(){
      if(this.initPromise) return this.initPromise;
      this.initPromise=(async()=>{
        try{
          const cfg=window.SRS_SUPABASE_CONFIG||{};
          if(!cfg.url||!cfg.publishableKey||!window.supabase){this.emit('local','Supabase configuration is missing');return false;}
          if(!this.client){
            this.client=window.supabase.createClient(cfg.url,cfg.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
          }
          this.emit('connecting','Signing in anonymously to Supabase…');
          await this.ensureSession();
          const result=await this.client.from('srs_vision_state').select('id,data,updated_at,updated_by').eq('id',1).maybeSingle();
          if(result.error) throw result.error;
          const remote=result.data;
          if(remote?.data && Object.keys(remote.data).length){
            if(this.dirty){
              this.emit('saving','Local changes waiting — syncing to Supabase…');
              await this.writeNow(true);
            }else{
              state=mergeState(remote.data);saveLocal();
            }
          }else{
            await this.writeNow(true);
          }
          await this.subscribe();
          this.reconnectDelay=1500;
          this.emit('online','Live database connected · realtime ON');
          return true;
        }catch(e){
          const message=e?.message||String(e)||'Supabase connection failed';
          this.emit('error',message);
          this.scheduleRetry();
          return false;
        }finally{
          this.initPromise=null;
        }
      })();
      return this.initPromise;
    },
    async subscribe(){
      if(!this.client||!this.session) return false;
      if(this.channel){try{await this.client.removeChannel(this.channel)}catch{}this.channel=null;}
      try{await this.client.realtime.setAuth(this.session.access_token)}catch{}
      this.channel=this.client.channel('srs-vision-live-v3');
      this.channel.on('postgres_changes',{event:'*',schema:'public',table:'srs_vision_state',filter:'id=eq.1'},payload=>{
        if(!payload.new?.data || this.dirty) return;
        state=mergeState(payload.new.data);saveLocal();renderRoute();notify('Live data updated');
      });
      return new Promise(resolve=>{
        let settled=false;
        const finish=v=>{if(!settled){settled=true;resolve(v)}};
        this.channel.subscribe((status,error)=>{
          if(status==='SUBSCRIBED'){this.emit('online','Live database connected · realtime ON');this.reconnectDelay=1500;finish(true);}
          else if(status==='CHANNEL_ERROR'){this.emit('error',error?.message||'Realtime channel error');this.scheduleRetry();finish(false);}
          else if(status==='TIMED_OUT'){this.emit('error','Realtime connection timed out');this.scheduleRetry();finish(false);}
          else if(status==='CLOSED'){this.emit('error','Realtime channel closed');this.scheduleRetry();finish(false);}
        });
        setTimeout(()=>finish(false),8000);
      });
    },
    queueSave(){
      this.dirty=true;this.changeVersion++;localStorage.setItem('srsVisionDirty','1');
      clearTimeout(this.saveTimer);this.saveTimer=setTimeout(()=>this.writeNow(false),250);
    },
    async writeNow(force=false){
      const seq=this.changeVersion;
      const payload=remotePayload();
      if(!this.client||!this.session){this.dirty=true;localStorage.setItem('srsVisionDirty','1');if(!force)this.scheduleRetry();return false;}
      this.writeChain=this.writeChain.then(async()=>{
        try{
          this.emit('saving','Saving shared SRS Vision data…');
          let result=await this.client.rpc('srs_vision_merge_state',{p_patch:payload});
          if(result.error){
            const row=await this.client.from('srs_vision_state').upsert({id:1,data:payload,updated_at:new Date().toISOString(),updated_by:this.session.user.id}).select('id,data,updated_at').single();
            if(row.error) throw row.error;
          }
          if(this.changeVersion===seq){
            this.dirty=false;localStorage.removeItem('srsVisionDirty');localStorage.setItem('srsVisionLastSavedAt',new Date().toISOString());
            this.emit('online','Saved globally · realtime ON');
          }else{
            this.dirty=true;clearTimeout(this.saveTimer);this.saveTimer=setTimeout(()=>this.writeNow(false),100);
          }
          return true;
        }catch(e){
          this.dirty=true;localStorage.setItem('srsVisionDirty','1');
          this.emit('error',e?.message||'Live save failed — retrying');
          this.scheduleRetry();
          return false;
        }
      });
      return this.writeChain;
    },
    scheduleRetry(){
      if(this.retryTimer)return;
      const delay=this.reconnectDelay;
      this.reconnectDelay=Math.min(30000,Math.round(this.reconnectDelay*1.7));
      this.retryTimer=setTimeout(()=>{this.retryTimer=null;this.init();},delay);
    },
    async refresh(){
      clearTimeout(this.retryTimer);this.retryTimer=null;
      this.channel=null;
      return this.init();
    }
  };
  window.SRSVisionLive=Live;

  function renderHeaderStatus(){
    const el=$('#dbStatus');if(!el)return;
    const map={online:['live','Live','Database Connected'],connecting:['dot','Connecting','Connecting…'],saving:['dot','Saving','Syncing…'],error:['err','Offline','Local fallback'] ,local:['dot','Local','Browser storage']};
    const [cls,label,sub]=map[Live.status]||map.local;
    el.innerHTML=`<span class="dot ${cls}"></span><span><b>${label}</b><small>${esc(sub)}</small></span>`;
  }

  function persist(){saveLocal();Live.queueSave();}

  // ---------- Shell ----------
  function shell(){
    document.body.className=`theme-${settings.theme||'blue'}`;
    const sideMain=[['dashboard','⌂','Dashboard'],['projects','▣','Projects'],['team','♧','Teams'],['calendar','📅','Calendar'],['reports','▥','Reports']];
    $('#app').innerHTML=`<div class="app">
      <aside class="sidebar">
        <div class="brand"><img src="assets/srs-vision-logo.png" alt="SRS Vision"><div><h1>SRS VISION</h1><small>YOUR VISION • OUR CREATION</small></div></div>
        <div class="navgroup"><div class="navlabel">Main</div>${sideMain.map(([r,i,l])=>`<button class="navitem ${route===r?'active':''}" data-nav="${r}"><span class="icon">${i}</span>${l}</button>`).join('')}</div>
        <div class="navgroup"><div class="navlabel">Workspace</div>
          <button class="navitem ${route==='team'?'active':''}" data-nav="team"><span class="icon">♙</span><span>Members</span></button>
          <button class="navitem ${route==='settings'?'active':''}" data-nav="settings"><span class="icon">⚙</span>Settings</button>
        </div>
        <div class="sidebarQuote"><b>Creative<br>Ideas<br>Build<br>Better<br>Tomorrow</b><i></i></div>
        <div class="sideBottom"><button class="navitem" data-nav="database"><span class="icon">●</span><span>Live Database</span></button></div>
      </aside>
      <main class="mainwrap">
        <header class="topbar">
          <div class="topbrand"><img src="assets/srs-vision-logo.png" alt="SRS Vision"><b>SRS VISION</b></div>
          <nav class="topnav">${sideMain.map(([r,i,l])=>`<button class="topnavItem ${route===r?'active':''}" data-nav="${r}">${i}<span>${l}</span></button>`).join('')}</nav>
          <div class="search"><span>⌕</span><input id="globalSearch" placeholder="Search projects, team members…"></div>
          <div class="topactions"><button class="bell" data-nav="notifications" title="Notifications">🔔</button><button class="status" id="dbStatus" data-nav="database" title="Open database dashboard"></button><div class="user"><span class="avatar">SV</span><div><b>SRS Vision</b><small>Team Workspace</small></div></div></div>
        </header>
        <div class="content" id="content"></div>
      </main>
    </div><nav class="mobileNav">${sideMain.slice(0,4).map(([r,i,l])=>`<button class="${route===r?'active':''}" data-nav="${r}">${i}<br>${l}</button>`).join('')}</nav>`;
    renderHeaderStatus();
  }

  const mainNav=[['dashboard','⌂','Dashboard'],['projects','▣','Projects'],['team','♧','Teams'],['calendar','📅','Calendar'],['reports','▥','Reports'],['team','◯','Members']];
  const toolNav=[['graphic-design','✦','Graphic Design'],['ai-tools','✧','AI Tools'],['social-media','◎','Social Media'],['video-tools','▶','Video Tools'],['image-tools','▧','Image Tools'],['document-tools','▤','Documents'],['pdf-tools','PDF','PDF Tools'],['productivity-tools','✓','Productivity'],['developer-tools','</>','Developer'],['business-tools','₹','Business'],['education-tools','⌘','Education'],['entertainment-tools','🎮','Entertainment'],['utilities-tools','⚡','Utilities'],['music','♫','Music Player']];
  const workNav=[['files','📁','Files'],['notifications','🔔','Notifications'],['money-transfer','💸','Money Transfer'],['database','◉','Database']];
  function navItems(group){const arr=group==='main'?mainNav:group==='tools'?toolNav:workNav;return arr.map(([r,i,l])=>`<button class="navitem ${route===r?'active':''}" data-nav="${r}"><span class="icon">${i}</span>${l}</button>`).join('')}
  function mobileItems(){return mainNav.slice(0,4).map(([r,i,l])=>`<button class="${route===r?'active':''}" data-nav="${r}">${i}<br>${l}</button>`).join('')}

  function navigate(r){if(r==='members')r='team';route=r;window.location.hash=r;shell();renderRoute();}

  // ---------- Main Dashboard ----------
  function renderMain(){
    const projects=state.projects||[];
    const active=projects.filter(p=>p.status!=='Completed').length;
    const completed=projects.filter(p=>p.status==='Completed').length;
    const value=projects.reduce((a,p)=>a+Number(p.value||0),0);
    const recent=projects.slice(0,5).map((p,i)=>`<div class="projectRow"><div class="thumb">${['BD','SM','PD','PK','GD'][i%5]}</div><div><div class="projectName">${esc(p.name)}</div><div class="projectSub">${esc(p.client)} · ${esc(p.member)}</div></div><div><div class="bar"><i style="width:${Math.max(0,Math.min(100,p.progress))}%"></i></div><div class="projectSub">${p.progress}%</div></div><span class="pill ${p.status==='Completed'?'done':p.status==='Planning'?'planning':p.status==='Pending'?'pending':'progress'}">${esc(p.status)}</span><button class="btn ghost" data-project="${i}" title="Edit project">⋮</button></div>`).join('');
    const people=state.team.members.slice(0,7).map(m=>`<span class="tinyA" title="${esc(m.name)}">${initials(m.name)}</span>`).join('');
    const activity=[
      ['✦','Project updated',projects[0]?`${projects[0].name} · ${projects[0].progress}%`:'No projects yet','5 min ago'],
      ['♧','SRS Vision team',`${state.team.members.length} members in one team`,'18 min ago'],
      ['◉','Database status',Live.status==='online'?'Live sync enabled':'Waiting for Supabase','Just now'],
      ['♫','Music Player',`${state.music.playlist.length} local track(s)`,'Today'],
      ['🔔','Notifications',`${state.social.notifications.length} alert(s)`,'Today']
    ].map(a=>`<div class="activityItem"><span class="aicon">${a[0]}</span><div><b>${a[1]}</b><small>${esc(a[2])} · ${a[3]}</small></div></div>`).join('');
    const events=state.calendar.slice(0,5).map(e=>`<div class="event"><b>${esc(e.title)}</b><small>${esc(e.date)} · ${esc(e.time||'Any time')}</small></div>`).join('')||'<div class="mutedBox">No events yet.</div>';
    const months=['Apr','May','Jun','Jul','Aug','Sep'];const vals=[42,55,68,58,76,92];
    const bars=vals.map((v,i)=>`<div class="chartBar"><i style="height:${v}%"></i><span>${months[i]}</span></div>`).join('');
    const toolSlots=toolNav.map(([r,i,l])=>`<button class="toolSlot" data-nav="${r}"><div class="toolIcon">${i}</div><b>${l}</b><small>${esc(TOOL_META[r]?.desc||'Dedicated dashboard')}</small></button>`).join('');
    $('#content').innerHTML=`
      <section class="heroImage"><div class="heroOverlay"><div class="eyebrow">SRS VISION · MAIN DASHBOARD</div><h2>Good Evening,<br><span>SRS Vision</span></h2><p>Your creative operations at a glance</p></div></section>
      <section class="kpis"><div class="kpi"><div class="kpiTop"><span class="kpiLabel">Total Projects</span><span>▣</span></div><b>${projects.length}</b><span class="trend">↑ ${active} active</span><small class="kpiHint">vs. last month</small></div><div class="kpi"><div class="kpiTop"><span class="kpiLabel">Team Members</span><span>♧</span></div><b>${state.team.members.length}</b><span class="trend">All SRS Vision</span><small class="kpiHint">single team</small></div><div class="kpi"><div class="kpiTop"><span class="kpiLabel">Active Work</span><span>✓</span></div><b>${active}</b><span class="trend">↑ ${completed} completed</span><small class="kpiHint">live tracker</small></div><div class="kpi"><div class="kpiTop"><span class="kpiLabel">Total Revenue</span><span>₹</span></div><b>${money(value)}</b><span class="trend">Tracked</span><small class="kpiHint">project value</small></div></section>
      <div class="grid"><section class="panel"><div class="panelHead"><h3>Recent Projects</h3><button class="btn ghost" data-nav="projects">View All →</button></div><div class="panelBody">${recent||'<div class="mutedBox">No projects yet.</div>'}</div></section><section class="panel"><div class="panelHead"><h3>Team Overview</h3><button class="btn ghost" data-nav="team">View All →</button></div><div class="panelBody"><div class="teamMini"><div class="teamTop"><b>${esc(state.team.name)}</b><span class="teamCount">${state.team.members.length}</span></div><div class="projectSub">All members belong to SRS Vision</div><div class="people">${people}<span class="tinyA">+${Math.max(0,state.team.members.length-7)}</span></div></div><div class="membersMeta"><span class="metaChip">${state.team.members.length} members</span><span class="metaChip">Edit Team</span></div></div></section><section class="panel"><div class="panelHead"><h3>Recent Activity</h3><button class="btn ghost" data-nav="notifications">View All →</button></div><div class="panelBody activity">${activity}</div></section></div>
      <div class="bottomGrid"><section class="panel"><div class="panelHead"><h3>Calendar</h3><button class="btn ghost" data-nav="calendar">Open Calendar →</button></div><div class="panelBody calendar"><div><div class="calgrid">${['S','M','T','W','T','F','S'].map(x=>`<div class="calday head">${x}</div>`).join('')}${Array.from({length:35},(_,i)=>`<div class="calday ${i===17?'today':''}">${(i%30)+1}</div>`).join('')}</div></div><div><div class="eyebrow" style="margin-bottom:10px">UPCOMING</div><div class="events">${events}</div></div></div></section><section class="panel"><div class="panelHead"><h3>Project Performance</h3><button class="btn ghost" data-nav="reports">View All →</button></div><div class="panelBody"><div style="display:grid;grid-template-columns:170px 1fr;gap:14px;align-items:center"><div class="donut"><div class="donutLabel"><div><b>${projects.length}</b><small>Total Projects</small></div></div></div><div class="legend"><div><span><i class="dotL" style="background:#16d7ff"></i>Active</span><b>${active}</b></div><div><span><i class="dotL" style="background:#7e4cff"></i>Completed</span><b>${completed}</b></div><div><span><i class="dotL" style="background:#ffd15a"></i>Pending</span><b>${projects.filter(p=>p.status==='Pending').length}</b></div><div><span><i class="dotL" style="background:#ef4fc6"></i>Planning</span><b>${projects.filter(p=>p.status==='Planning').length}</b></div></div></div><div class="chartWrap"><div class="chartBars">${bars}</div></div></div></section></div>
      <section class="panel" style="margin-top:16px"><div class="panelHead"><h3>Tool Slots</h3><span class="subtitle">Each tool opens in its own dashboard</span></div><div class="panelBody"><div class="toolGrid">${toolSlots}</div></div></section>`;
    $$('.projectRow [data-project]').forEach(b=>b.addEventListener('click',()=>editProject(Number(b.dataset.project))));
  }

  // ---------- Teams ----------
  function renderTeam(){
    const cards=state.team.members.map((m,i)=>`<article class="member"><div class="memberHead"><div class="memberAvatar">${initials(m.name)}</div><div><h4>${esc(m.name)}</h4><small>${esc(m.role||'Team Member')}</small></div></div><div class="projectSub" style="margin-top:8px">${esc(m.service||'Service not set')}</div><div class="projectSub">${esc(m.description||'SRS Vision member')}</div><div class="memberActions"><button class="btn primary" data-member-edit="${i}">✎ Edit</button><button class="btn" data-member-custom="${i}">⚙ Custom</button><button class="btn danger" data-member-delete="${i}">Remove</button></div></article>`).join('');
    $('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · TEAM MANAGEMENT</div><div class="title">${esc(state.team.name)}</div><div class="subtitle">One shared SRS Vision team with all ${state.team.members.length} members.</div></div><div><button class="btn primary" data-add-member>＋ Add Member</button></div></div><div class="membersMeta"><span class="metaChip">${state.team.members.length} Members</span><span class="metaChip">Shared Team</span><span class="metaChip">Editable</span><span class="metaChip">Realtime Ready</span></div><section class="panel"><div class="panelHead"><h3>All SRS Vision Members</h3><span class="subtitle">Click Edit to change name, role, service, phone, skills and notes.</span></div><div class="panelBody"><div class="memberGrid">${cards}</div></div></section>`;
  }
  function editMember(i){const m=state.team.members[i];openModal(`Edit ${m.name}`,`<div class="modalGrid"><div class="field"><label>Name</label><input class="input" id="mName" value="${esc(m.name)}"></div><div class="field"><label>Role</label><input class="input" id="mRole" value="${esc(m.role)}"></div><div class="field"><label>Service</label><input class="input" id="mService" value="${esc(m.service)}"></div><div class="field"><label>Phone</label><input class="input" id="mPhone" value="${esc(m.phone)}"></div><div class="field"><label>Skills</label><input class="input" id="mSkills" value="${esc(m.skills)}"></div><div class="field"><label>Description</label><input class="input" id="mDesc" value="${esc(m.description)}"></div><div class="field" style="grid-column:1/-1"><label>Notes</label><textarea class="textarea" id="mNotes">${esc(m.notes)}</textarea></div></div>`,()=>{m.name=$('#mName').value.trim()||m.name;m.role=$('#mRole').value.trim()||'Team Member';m.service=$('#mService').value.trim();m.phone=$('#mPhone').value.trim();m.skills=$('#mSkills').value.trim();m.description=$('#mDesc').value.trim();m.notes=$('#mNotes').value.trim();persist();navigate('team')});}

  // ---------- Generic tool frame + real mini-tools ----------
  function renderTool(key){
    if(key==='graphic-design')return renderGraphicDesign();
    if(key==='ai-tools')return renderAI();
    if(key==='social-media')return renderSocial();
    if(key==='image-tools')return renderImageTools();
    if(key==='document-tools')return renderDocumentTools();
    if(key==='pdf-tools')return renderPdfTools();
    if(key==='productivity-tools')return renderProductivity();
    if(key==='developer-tools')return renderDeveloper();
    if(key==='business-tools')return renderBusiness();
    if(key==='education-tools')return renderEducation();
    if(key==='entertainment-tools')return renderEntertainment();
    if(key==='utilities-tools')return renderUtilities();
    if(key==='music')return renderMusic();
    return renderVideoTools();
  }
  function toolHeader(key,actionHtml=''){
    const v=TOOL_META[key];return `<div class="pageHead"><div><div class="eyebrow">SRS VISION · DEDICATED DASHBOARD</div><div class="title">${v.icon} ${esc(v.title)}</div><div class="subtitle">${esc(v.desc)}</div></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn ghost" data-nav="dashboard">← Main Dashboard</button>${actionHtml}</div></div>`;
  }

  function renderGraphicDesign(){
    $('#content').innerHTML=toolHeader('graphic-design','<button class="btn primary" id="gdExport">Export PNG</button>')+`<section class="workspace"><div class="wsGrid"><div><div class="field"><label>Design Title</label><input class="input" id="gdTitle" value="Your Vision"></div><div class="field" style="margin-top:10px"><label>Subtitle</label><input class="input" id="gdSubtitle" value="Our Creation"></div><div class="field" style="margin-top:10px"><label>Background</label><input class="input" id="gdBg" type="color" value="#143d7a"></div><div class="field" style="margin-top:10px"><label>Text Color</label><input class="input" id="gdColor" type="color" value="#ffffff"></div><div class="field" style="margin-top:10px"><label>Custom message</label><textarea class="textarea" id="gdMessage">Create designs, posters, social creatives and brand stories from SRS Vision.</textarea></div><div class="heroActions"><button class="btn primary" id="gdApply">Update Preview</button><button class="btn" id="gdSave">Save Draft</button></div></div><div class="editorCanvas"><div class="canvasInner" id="gdCanvas"><div><h2 id="gdCanvasTitle">Your Vision</h2><p id="gdCanvasSubtitle">Our Creation</p><p id="gdCanvasMessage">Create designs, posters, social creatives and brand stories from SRS Vision.</p></div></div></div></div></section><section class="panel" style="margin-top:14px"><div class="panelHead"><h3>Design Categories</h3></div><div class="panelBody workspaceCards">${['Brand Identity','Social Creatives','Posters & Flyers','Thumbnails','Print Design','Presentation Design'].map(x=>`<button class="miniTool" data-category="${esc(x)}"><b>✦ ${esc(x)}</b><small>Open focused ${esc(x.toLowerCase())} workflow</small></button>`).join('')}</div></section>`;
    const apply=()=>{$('#gdCanvasTitle').textContent=$('#gdTitle').value||'Your Vision';$('#gdCanvasSubtitle').textContent=$('#gdSubtitle').value||'Our Creation';$('#gdCanvasMessage').textContent=$('#gdMessage').value||'';$('#gdCanvas').style.background=$('#gdBg').value;$('#gdCanvas').style.color=$('#gdColor').value};
    $('#gdApply').onclick=apply;$('#gdSave').onclick=()=>{state.notes.unshift({id:Date.now(),title:$('#gdTitle').value||'Design Draft',body:$('#gdMessage').value||'',date:nowDate()});persist();notify('Graphic design draft saved')};
    $('#gdExport').onclick=async()=>{apply();const c=document.createElement('canvas');c.width=1200;c.height=750;const ctx=c.getContext('2d');ctx.fillStyle=$('#gdBg').value;ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle=$('#gdColor').value;ctx.textAlign='center';ctx.font='900 70px Segoe UI';ctx.fillText($('#gdTitle').value||'Your Vision',600,280);ctx.font='600 34px Segoe UI';ctx.fillText($('#gdSubtitle').value||'Our Creation',600,350);ctx.font='400 24px Segoe UI';wrapCanvasText(ctx,$('#gdMessage').value||'',600,430,800,34);downloadData(c.toDataURL('image/png'),'srs-vision-design.png')};
    $$('.miniTool[data-category]').forEach(b=>b.onclick=()=>notify(`${b.dataset.category} editor is available in this Graphic Design dashboard`));
  }
  function wrapCanvasText(ctx,text,x,y,maxWidth,lineHeight){const words=text.split(/\s+/);let line='';for(const w of words){const test=line?line+' '+w:w;if(ctx.measureText(test).width>maxWidth&&line){ctx.fillText(line,x,y);line=w;y+=lineHeight}else line=test}if(line)ctx.fillText(line,x,y)}

  function renderAI(){
    const history=state.ai.history.slice(0,8).map(x=>`<div class="event"><b>${esc(x.model)}</b><small>${esc(x.prompt)} · ${esc(x.date)}</small></div>`).join('')||'<div class="mutedBox">No prompts yet.</div>';
    $('#content').innerHTML=toolHeader('ai-tools')+`<section class="workspace"><div class="wsGrid"><div><div class="field"><label>Choose AI platform</label><select class="select" id="aiModel">${DIRECT_AI.map(x=>`<option>${x[0]}</option>`).join('')}</select></div><div class="field" style="margin-top:10px"><label>Prompt</label><textarea class="textarea" id="aiPrompt" placeholder="Write your prompt here..."></textarea></div><div class="heroActions"><button class="btn primary" id="aiLaunch">Open AI</button><button class="btn" id="aiSave">Save Prompt</button></div><div class="mutedBox" style="margin-top:12px">The official AI platforms open in their own browser tabs; no private API key is stored in this website.</div></div><div><div class="eyebrow">Saved prompt history</div><div class="events" style="margin-top:10px">${history}</div></div></div></section><section class="panel" style="margin-top:14px"><div class="panelHead"><h3>Direct AI Slots</h3></div><div class="panelBody workspaceCards">${DIRECT_AI.map(x=>`<button class="miniTool" data-ai-url="${x[1]}"><b>✧ ${esc(x[0])}</b><small>Open ${esc(x[0])} directly</small></button>`).join('')}</div></section>`;
    $('#aiLaunch').onclick=()=>{const p=$('#aiPrompt').value.trim();const m=$('#aiModel').value;const url=DIRECT_AI.find(x=>x[0]===m)?.[1];if(p)state.ai.history.unshift({model:m,prompt:p,date:nowDate()});persist();window.open(url,'_blank','noopener');notify(`${m} opened in a new tab`)};
    $('#aiSave').onclick=()=>{const p=$('#aiPrompt').value.trim();if(!p)return notify('Write a prompt first');state.ai.history.unshift({model:$('#aiModel').value,prompt:p,date:nowDate()});persist();notify('Prompt saved')};
    $$('[data-ai-url]').forEach(b=>b.onclick=()=>window.open(b.dataset.aiUrl,'_blank','noopener'));
  }

  function renderSocial(){
    const platforms=PLATFORMS.map(p=>`<button class="miniTool" data-platform-url="${p[4]}" data-platform-name="${esc(p[2])}"><b>${p[1]} ${esc(p[2])}</b><small>${esc(p[3])}</small></button>`).join('');
    const notes=state.social.notifications.slice(0,10).map(n=>`<div class="notifRow"><span class="notifIcon">${n.platform==='Instagram'?'◎':'🔔'}</span><div><b>${esc(n.title)}</b><small>${esc(n.platform)} · ${esc(n.body)}</small></div><small>${esc(n.time||'')}</small></div>`).join('')||'<div class="mutedBox">No notifications.</div>';
    $('#content').innerHTML=toolHeader('social-media')+`<div class="wsGrid"><section class="panel"><div class="panelHead"><h3>Platform Slots</h3><span class="subtitle">Connect/open each platform independently</span></div><div class="panelBody workspaceCards">${platforms}</div></section><section class="panel"><div class="panelHead"><h3>Website Notifications</h3><button class="btn" id="testSocialNotification">Test</button></div><div class="panelBody">${notes}<div class="mutedBox" style="margin-top:12px">Live platform notifications require each platform's official OAuth/API/webhook connection. This dashboard is the shared notification inbox.</div></div></section></div><section class="workspace" style="margin-top:14px"><div class="field"><label>Social post draft</label><textarea class="textarea" id="socialDraft" placeholder="Write a post / caption…"></textarea></div><div class="field" style="margin-top:10px"><label>Platform</label><select class="select" id="socialPlatform">${PLATFORMS.map(p=>`<option>${p[2]}</option>`).join('')}</select></div><div class="heroActions"><button class="btn primary" id="socialSave">Save Draft</button><button class="btn" id="socialOpen">Open Platform</button></div></section>`;
    $$('[data-platform-url]').forEach(b=>b.onclick=()=>window.open(b.dataset.platformUrl,'_blank','noopener'));
    $('#testSocialNotification').onclick=()=>{state.social.notifications.unshift({platform:'SRS Vision',title:'Test notification',body:'Social media notification inbox is working.',time:'Just now'});persist();renderSocial();notify('Notification added')};
    $('#socialSave').onclick=()=>{const d=$('#socialDraft').value.trim();if(!d)return notify('Write a draft first');state.social.drafts.unshift({platform:$('#socialPlatform').value,text:d,date:nowDate()});persist();notify('Social draft saved')};
    $('#socialOpen').onclick=()=>{const p=PLATFORMS.find(x=>x[2]===$('#socialPlatform').value);window.open(p[4],'_blank','noopener')};
  }

  function renderImageTools(){
    $('#content').innerHTML=toolHeader('image-tools','<button class="btn primary" id="imgDownload">Download Image</button>')+`<section class="workspace"><div class="wsGrid"><div><div class="field"><label>Choose image</label><input class="input" id="imgFile" type="file" accept="image/*"></div><div class="field" style="margin-top:10px"><label>Brightness</label><input id="imgBright" class="range" type="range" min="50" max="150" value="100"></div><div class="field" style="margin-top:10px"><label>Contrast</label><input id="imgContrast" class="range" type="range" min="50" max="150" value="100"></div><div class="field" style="margin-top:10px"><label>Grayscale</label><input id="imgGray" class="range" type="range" min="0" max="100" value="0"></div><div class="heroActions"><button class="btn" id="imgRotate">Rotate 90°</button><button class="btn" id="imgReset">Reset</button></div></div><div class="editorCanvas"><canvas id="imgCanvas" width="800" height="500"></canvas></div></div></section>`;
    const canvas=$('#imgCanvas'),ctx=canvas.getContext('2d');let image=new Image(),rotate=0;const fit=()=>{ctx.save();ctx.clearRect(0,0,canvas.width,canvas.height);const f=`brightness(${$('#imgBright').value}%) contrast(${$('#imgContrast').value}%) grayscale(${$('#imgGray').value}%)`;ctx.filter=f;ctx.translate(canvas.width/2,canvas.height/2);ctx.rotate(rotate*Math.PI/180);if(image.src){const scale=Math.min(canvas.width/image.width,canvas.height/image.height);ctx.drawImage(image,-image.width*scale/2,-image.height*scale/2,image.width*scale,image.height*scale)}else{ctx.fillStyle='#07172d';ctx.fillRect(-400,-250,800,500);ctx.fillStyle='#8fa7c4';ctx.font='24px Segoe UI';ctx.textAlign='center';ctx.fillText('Choose an image to start editing',0,0)}ctx.restore()};
    $('#imgFile').onchange=e=>{const file=e.target.files?.[0];if(!file)return;const rd=new FileReader();rd.onload=()=>{image.onload=fit;image.src=rd.result};rd.readAsDataURL(file)};['imgBright','imgContrast','imgGray'].forEach(id=>$(('#'+id)).oninput=fit);$('#imgRotate').onclick=()=>{rotate=(rotate+90)%360;fit()};$('#imgReset').onclick=()=>{rotate=0;$('#imgBright').value=100;$('#imgContrast').value=100;$('#imgGray').value=0;fit()};$('#imgDownload').onclick=()=>downloadData(canvas.toDataURL('image/png'),'srs-vision-edited-image.png');fit();
  }

  function renderDocumentTools(){
    $('#content').innerHTML=toolHeader('document-tools','<button class="btn primary" id="docExport">Export TXT</button>')+`<section class="workspace"><div class="field"><label>Title</label><input class="input" id="docTitle" value="${esc(state.document.title)}" placeholder="Document title"></div><div class="field" style="margin-top:10px"><label>Body</label><textarea class="textarea" id="docBody" style="min-height:330px" placeholder="Write your document…">${esc(state.document.body)}</textarea></div><div class="heroActions"><button class="btn primary" id="docSave">Save Document</button><button class="btn" id="docPrint">Print / Save as PDF</button></div></section>`;
    $('#docSave').onclick=()=>{state.document={title:$('#docTitle').value,body:$('#docBody').value};persist();notify('Document saved')};$('#docExport').onclick=()=>downloadBlob(`${$('#docTitle').value||'srs-vision-document'}\n\n${$('#docBody').value}`,'text/plain',`${($('#docTitle').value||'document').replace(/\W+/g,'-')}.txt`);$('#docPrint').onclick=()=>printHtml($('#docTitle').value||'SRS Vision Document',$('#docBody').value);
  }
  function renderPdfTools(){
    $('#content').innerHTML=toolHeader('pdf-tools','<button class="btn primary" id="pdfPrint">Create PDF</button>')+`<section class="workspace"><div class="field"><label>PDF-ready title</label><input class="input" id="pdfTitle" placeholder="Project Proposal"></div><div class="field" style="margin-top:10px"><label>Content</label><textarea class="textarea" id="pdfBody" style="min-height:350px" placeholder="Write the content you want to print/export as PDF…"></textarea></div><div class="mutedBox" style="margin-top:10px">Use your browser's Print dialog and choose “Save as PDF”.</div></section><section class="panel" style="margin-top:14px"><div class="panelHead"><h3>PDF Slots</h3></div><div class="panelBody workspaceCards">${['Create PDF','Print PDF','PDF-ready proposal','PDF-ready invoice','PDF-ready report','Merge workflow'].map(x=>`<div class="miniTool"><b>▤ ${x}</b><small>${x==='Merge workflow'?'Collect files for a later merge workflow.':'Use the editor above and export with the browser print dialog.'}</small></div>`).join('')}</div></section>`;
    $('#pdfPrint').onclick=()=>printHtml($('#pdfTitle').value||'SRS Vision PDF',$('#pdfBody').value);
  }
  function renderProductivity(){
    const rows=state.tasks.map((t,i)=>`<div class="song"><div><b>${t.done?'✓':'○'} ${esc(t.title)}</b><small>${esc(t.priority)}</small></div><button class="btn ${t.done?'':'primary'}" data-task-toggle="${i}">${t.done?'Undo':'Done'}</button><button class="btn danger" data-task-delete="${i}">×</button></div>`).join('')||'<div class="mutedBox">No tasks.</div>';
    $('#content').innerHTML=toolHeader('productivity-tools','<button class="btn primary" id="taskAdd">＋ Add Task</button>')+`<section class="workspace"><div class="field"><label>Quick note</label><textarea class="textarea" id="quickNote" placeholder="Write a note for the team…"></textarea></div><button class="btn" id="saveNote" style="margin-top:10px">Save Note</button></section><section class="panel" style="margin-top:14px"><div class="panelHead"><h3>Tasks</h3><span class="subtitle">Local + Supabase synced metadata</span></div><div class="panelBody playlist">${rows}</div></section>`;
    $('#taskAdd').onclick=()=>{const title=prompt('Task name');if(!title)return;const priority=prompt('Priority (High/Medium/Low)','Medium')||'Medium';state.tasks.unshift({title,done:false,priority});persist();renderProductivity()};$('#saveNote').onclick=()=>{const text=$('#quickNote').value.trim();if(!text)return;state.notes.unshift({id:Date.now(),title:'Quick Note',body:text,date:nowDate()});persist();notify('Note saved')};$('[data-task-toggle]')&&$$('[data-task-toggle]').forEach(b=>b.onclick=()=>{state.tasks[Number(b.dataset.taskToggle)].done=!state.tasks[Number(b.dataset.taskToggle)].done;persist();renderProductivity()});$$('[data-task-delete]').forEach(b=>b.onclick=()=>{state.tasks.splice(Number(b.dataset.taskDelete),1);persist();renderProductivity()});
  }
  function renderDeveloper(){
    $('#content').innerHTML=toolHeader('developer-tools','<button class="btn primary" id="jsonFormat">Format JSON</button>')+`<section class="workspace"><div class="field"><label>Code / JSON</label><textarea class="textarea" id="codeEditor" style="min-height:430px;font-family:Consolas,monospace" spellcheck="false">{\n  "project": "SRS Vision",\n  "status": "working"\n}</textarea></div><div class="heroActions"><button class="btn primary" id="codeCopy">Copy</button><button class="btn" id="codeDownload">Download</button></div><div class="mutedBox" style="margin-top:10px">Browser-side editor only; no secret keys are stored here.</div></section>`;
    $('#jsonFormat').onclick=()=>{try{$('#codeEditor').value=JSON.stringify(JSON.parse($('#codeEditor').value),null,2);notify('JSON formatted')}catch{notify('That is not valid JSON')}};$('#codeCopy').onclick=async()=>{await navigator.clipboard?.writeText($('#codeEditor').value);notify('Copied')};$('#codeDownload').onclick=()=>downloadBlob($('#codeEditor').value,'text/plain','srs-vision-snippet.txt');
  }
  function renderBusiness(){
    const lines=[{name:'Design Service',qty:1,rate:5000}];
    $('#content').innerHTML=toolHeader('business-tools','<button class="btn primary" id="invoicePrint">Print Invoice</button>')+`<section class="workspace"><div class="modalGrid"><div class="field"><label>Client</label><input class="input" id="invClient" placeholder="Client name"></div><div class="field"><label>Reference</label><input class="input" id="invRef" value="INV-${Date.now().toString().slice(-6)}"></div><div class="field"><label>Item</label><input class="input" id="invItem" value="Design Service"></div><div class="field"><label>Amount (₹)</label><input class="input" id="invAmt" type="number" value="5000"></div></div><div class="heroActions"><button class="btn primary" id="invSave">Save Invoice</button></div></section><section class="panel" style="margin-top:14px"><div class="panelHead"><h3>Saved Invoices</h3></div><div class="panelBody">${state.invoices.map(x=>`<div class="event"><b>${esc(x.ref)} · ${esc(x.client)}</b><small>${money(x.amount)} · ${esc(x.date)}</small></div>`).join('')||'<div class="mutedBox">No invoices yet.</div>'}</div></section>`;
    const save=()=>{const client=$('#invClient').value.trim();const amount=Number($('#invAmt').value||0);if(!client||!amount)return notify('Enter client and amount');state.invoices.unshift({ref:$('#invRef').value,client,amount,item:$('#invItem').value,date:nowDate()});persist();notify('Invoice saved');renderBusiness()};
    $('#invSave').onclick=save;$('#invoicePrint').onclick=()=>printHtml($('#invRef').value,`Client: ${$('#invClient').value}\nItem: ${$('#invItem').value}\nAmount: ${money($('#invAmt').value)}`);
  }
  function renderEducation(){
    const cards=['What is branding?','Explain color theory.','What makes a good thumbnail?','How does SEO work?'];
    $('#content').innerHTML=toolHeader('education-tools','<button class="btn primary" id="quizBtn">Start Quiz</button>')+`<section class="workspace"><div class="field"><label>Study note</label><textarea class="textarea" id="eduNote" placeholder="Write or paste study notes…"></textarea></div><button class="btn" id="eduSave">Save Note</button></section><section class="panel" style="margin-top:14px"><div class="panelHead"><h3>Flashcards</h3></div><div class="panelBody workspaceCards">${cards.map(x=>`<button class="miniTool" data-flash="${esc(x)}"><b>⌘ ${esc(x)}</b><small>Click to reveal a sample explanation</small></button>`).join('')}</div></section>`;
    $('#eduSave').onclick=()=>{const t=$('#eduNote').value.trim();if(!t)return;state.notes.unshift({id:Date.now(),title:'Education Note',body:t,date:nowDate()});persist();notify('Study note saved')};$('#quizBtn').onclick=()=>{const q=['12','4','7'];const ans=prompt('Quick quiz: How many AI platforms are listed in SRS Vision?\nType a number');notify(ans==='5'?'Correct — 5 platforms':'Answer: 5')};$$('[data-flash]').forEach(b=>b.onclick=()=>alert(b.dataset.flash+'\n\nSample study prompt: write your own explanation, then save it as a note.'));
  }
  function renderEntertainment(){
    $('#content').innerHTML=toolHeader('entertainment-tools')+`<section class="workspace"><div class="pageHead"><div><div class="eyebrow">MINI GAME</div><div class="title">Tic-Tac-Toe</div><div class="subtitle">Simple browser-side game inside its own workspace.</div></div><button class="btn" id="gameReset">Reset</button></div><div id="game" class="toolGrid" style="grid-template-columns:repeat(3,90px);justify-content:center"></div><div class="mutedBox" id="gameStatus" style="margin-top:14px;text-align:center">Your turn</div></section>`;
    let board=Array(9).fill('');let turn='X';const checkWin=()=>{for(const [a,b,c] of [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]])if(board[a]&&board[a]===board[b]&&board[a]===board[c])return board[a];return board.every(Boolean)?'draw':''};const render=()=>{$('#game').innerHTML=board.map((v,i)=>`<button class="toolSlot" style="min-height:90px;font-size:28px" data-cell="${i}">${v||'·'}</button>`).join('');$$('[data-cell]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.cell);if(board[i]||checkWin())return;board[i]=turn;const w=checkWin();if(w){$('#gameStatus').textContent=w==='draw'?'Draw':w+' wins'}else{turn=turn==='X'?'O':'X';$('#gameStatus').textContent='Turn: '+turn};render()})};$('#gameReset').onclick=()=>{board=Array(9).fill('');turn='X';render();$('#gameStatus').textContent='Your turn'};render();
  }
  function renderUtilities(){
    $('#content').innerHTML=toolHeader('utilities-tools')+`<section class="workspace"><div class="pageHead"><div><div class="eyebrow">CALCULATOR</div><div class="title">Quick Calculator</div></div><div class="subtitle">Runs entirely in your browser.</div></div><div class="calc"><div class="calcDisplay" id="calcDisplay">0</div>${['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(x=>`<button class="${['/','*','-','+','='].includes(x)?'op':''}" data-calc="${x}">${x}</button>`).join('')}</div></section>`;
    let expr='';const display=$('#calcDisplay');$$('[data-calc]').forEach(b=>b.onclick=()=>{const x=b.dataset.calc;if(x==='='){try{display.textContent=Function('return '+expr)();expr=String(display.textContent)}catch{display.textContent='Error';expr=''}}else{expr+=x;display.textContent=expr}});
  }

  function renderVideoTools(){
    $('#content').innerHTML=toolHeader('video-tools','<button class="btn primary" id="videoPoster">Capture Poster</button>')+`<section class="workspace"><div class="wsGrid"><div><div class="field"><label>Video file</label><input class="input" id="videoFile" type="file" accept="video/*"></div><div class="field" style="margin-top:10px"><label>Playback speed</label><select class="select" id="videoSpeed"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></div><div class="field" style="margin-top:10px"><label>Review notes</label><textarea class="textarea" id="videoNotes" placeholder="Editor notes…"></textarea></div><button class="btn primary" id="videoSave">Save Review Notes</button></div><div class="editorCanvas"><video id="videoPreview" controls style="max-width:100%;max-height:360px;border-radius:12px;background:#000"></video></div></div></section>`;
    const video=$('#videoPreview');$('#videoFile').onchange=e=>{const f=e.target.files?.[0];if(!f)return;video.src=URL.createObjectURL(f)};$('#videoSpeed').onchange=e=>video.playbackRate=Number(e.target.value);$('#videoSave').onclick=()=>{const t=$('#videoNotes').value.trim();if(t){state.notes.unshift({id:Date.now(),title:'Video Review',body:t,date:nowDate()});persist();notify('Video review saved')}};$('#videoPoster').onclick=()=>{if(!video.videoWidth)return notify('Load a video first');const c=document.createElement('canvas');c.width=video.videoWidth;c.height=video.videoHeight;c.getContext('2d').drawImage(video,0,0);downloadData(c.toDataURL('image/png'),'srs-vision-video-poster.png')};
  }

  function renderMusic(){
    const list=state.music.playlist.map((x,i)=>`<div class="song"><div><b>${esc(x.name)}</b><small>${Math.round((x.duration||0)/60)} min</small></div><button class="btn primary" data-play="${i}">Play</button><button class="btn danger" data-song-delete="${i}">×</button></div>`).join('')||'<div class="mutedBox">Add local audio files to build your playlist.</div>';
    $('#content').innerHTML=toolHeader('music','<button class="btn primary" id="musicAdd">＋ Add Music</button>')+`<div class="music"><section class="cover"><div><div class="record"></div><div style="text-align:center;margin-top:14px;font-weight:900">SRS VISION MUSIC</div></div></section><section class="player"><div class="eyebrow">NOW PLAYING</div><div class="trackName" id="trackName">Nothing playing</div><div class="trackArtist">Local music player</div><input class="range" id="musicSeek" type="range" min="0" max="100" value="0"><div class="playerBtns"><button class="circleBtn" id="prevSong">◀</button><button class="circleBtn play" id="playPause">▶</button><button class="circleBtn" id="nextSong">▶</button></div><div class="field"><label>Add audio files</label><input class="input" id="musicFile" type="file" accept="audio/*" multiple></div><div class="playlist" style="margin-top:12px">${list}</div></section></div>`;
    $('#musicAdd').onclick=()=>$('#musicFile').click();$('#musicFile').onchange=e=>{[...e.target.files||[]].forEach(file=>{state.music.playlist.push({name:file.name,url:URL.createObjectURL(file),duration:0});const idx=state.music.playlist.length-1;const audio=document.createElement('audio');audio.src=state.music.playlist[idx].url;audio.onloadedmetadata=()=>{state.music.playlist[idx].duration=audio.duration;persist();renderMusic()}});persist();renderMusic();notify('Music added')};
    let activeIndex=-1;let audio=null;
    const playIndex=(i)=>{if(!state.music.playlist[i])return;if(audio){audio.pause();if(currentAudio===audio)currentAudio=null}activeIndex=i;audio=new Audio(state.music.playlist[i].url);currentAudio=audio;$('#trackName').textContent=state.music.playlist[i].name;audio.onended=()=>{const n=(activeIndex+1)%state.music.playlist.length;playIndex(n)};audio.ontimeupdate=()=>{if(audio.duration)$('#musicSeek').value=(audio.currentTime/audio.duration)*100};audio.play();$('#playPause').textContent='⏸'};
    $$('[data-play]').forEach(b=>b.onclick=()=>playIndex(Number(b.dataset.play)));$$('[data-song-delete]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.songDelete);state.music.playlist.splice(i,1);persist();renderMusic()});
    $('#playPause').onclick=()=>{if(!audio){if(state.music.playlist.length)playIndex(0);return}if(audio.paused){audio.play();$('#playPause').textContent='⏸'}else{audio.pause();$('#playPause').textContent='▶'}};$('#prevSong').onclick=()=>{if(state.music.playlist.length)playIndex((Math.max(0,activeIndex-1)));};$('#nextSong').onclick=()=>{if(state.music.playlist.length)playIndex((activeIndex+1)%state.music.playlist.length)};$('#musicSeek').oninput=e=>{if(audio&&audio.duration)audio.currentTime=(Number(e.target.value)/100)*audio.duration};
  }

  // ---------- Projects / Calendar / Reports / Files ----------
  function renderProjects(){
    const rows=state.projects.map((p,i)=>`<div class="trow"><div><b>${esc(p.name)}</b><small class="projectSub">${esc(p.client)} · ${esc(p.member)}</small></div><div>${esc(p.status)}</div><div>${p.progress}%</div><div class="money">${money(p.value)}</div><div><button class="btn primary" data-project-edit="${i}">✎ Edit</button></div></div>`).join('');
    $('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · PROJECTS</div><div class="title">Projects</div><div class="subtitle">Manage work from its own dashboard; changes save to SRS Vision automatically.</div></div><button class="btn primary" id="projectAdd">＋ Add Project</button></div><section class="panel"><div class="panelHead"><h3>Project Records</h3></div><div class="panelBody"><div class="tableLike"><div class="trow thead2"><div>Project</div><div>Status</div><div>Progress</div><div>Value</div><div>Actions</div></div>${rows||'<div class="mutedBox">No projects.</div>'}</div></div></section>`;
    $('#projectAdd').onclick=()=>openModal('Add Project',`<div class="modalGrid"><div class="field"><label>Name</label><input class="input" id="pName"></div><div class="field"><label>Client</label><input class="input" id="pClient"></div><div class="field"><label>Member</label><select class="select" id="pMember">${MEMBERS.map(x=>`<option>${x}</option>`).join('')}</select></div><div class="field"><label>Value</label><input class="input" id="pValue" type="number"></div><div class="field"><label>Progress</label><input class="input" id="pProgress" type="number" min="0" max="100" value="0"></div><div class="field"><label>Status</label><select class="select" id="pStatus"><option>Planning</option><option>In Progress</option><option>Pending</option><option>Completed</option></select></div></div>`,()=>{state.projects.unshift({name:$('#pName').value||'New Project',client:$('#pClient').value||'Internal',member:$('#pMember').value, value:Number($('#pValue').value||0), progress:Math.max(0,Math.min(100,Number($('#pProgress').value||0))),status:$('#pStatus').value,due:nowDate()});persist();closeModal();renderProjects()});
    $$('[data-project-edit]').forEach(b=>b.onclick=()=>editProject(Number(b.dataset.projectEdit)));
  }
  function renderCalendar(){
    const now=new Date();const y=now.getFullYear(),m=now.getMonth();const month=now.toLocaleString('en-US',{month:'long',year:'numeric'});const first=new Date(y,m,1).getDay();const days=new Date(y,m+1,0).getDate();
    const cells=[];for(let i=0;i<first;i++)cells.push('<div class="calday muted"></div>');for(let d=1;d<=days;d++){const ds=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;const isToday=d===now.getDate();cells.push(`<div class="calday ${isToday?'today':''}">${d}</div>`);}while(cells.length%7)cells.push('<div class="calday muted"></div>');
    const events=state.calendar.map((e,i)=>`<div class="event"><div style="display:flex;justify-content:space-between;gap:8px"><div><b>${esc(e.title)}</b><small>${esc(e.date)} · ${esc(e.time||'')} · ${esc(e.type||'Event')}</small></div><button class="btn danger" data-event-del="${i}">×</button></div></div>`).join('');
    $('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · CALENDAR</div><div class="title">Calendar</div><div class="subtitle">Shared schedule saved to Supabase.</div></div><button class="btn primary" id="eventAdd">＋ Add Event</button></div><section class="panel"><div class="panelHead"><h3>${month}</h3></div><div class="panelBody"><div class="calendar"><div><div class="calgrid">${['S','M','T','W','T','F','S'].map(x=>`<div class="calday head">${x}</div>`).join('')}${cells.join('')}</div></div><div><div class="eyebrow">EVENTS</div><div class="events" style="margin-top:10px">${events||'<div class="mutedBox">No events.</div>'}</div></div></div></div></section>`;
    $('#eventAdd').onclick=()=>openModal('Add Calendar Event',`<div class="modalGrid"><div class="field"><label>Title</label><input class="input" id="eTitle"></div><div class="field"><label>Date</label><input class="input" id="eDate" type="date" value="${nowDate()}"></div><div class="field"><label>Time</label><input class="input" id="eTime" type="time"></div><div class="field"><label>Type</label><select class="select" id="eType"><option>Meeting</option><option>Deadline</option><option>Payment</option><option>Announcement</option></select></div></div>`,()=>{state.calendar.push({title:$('#eTitle').value||'Event',date:$('#eDate').value,time:$('#eTime').value,type:$('#eType').value});persist();closeModal();renderCalendar()});
    $$('[data-event-del]').forEach(b=>b.onclick=()=>{state.calendar.splice(Number(b.dataset.eventDel),1);persist();renderCalendar()});
  }
  function renderReports(){const total=state.projects.reduce((a,p)=>a+Number(p.value||0),0);const done=state.projects.filter(p=>p.status==='Completed').length;$('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · REPORTS</div><div class="title">Reports & Analytics</div><div class="subtitle">Separate reporting dashboard with live status and shared metrics.</div></div><button class="btn primary" id="reportPrint">Print Report</button></div><section class="kpis"><div class="kpi"><span class="kpiLabel">Project Value</span><b>${money(total)}</b><span class="trend">Tracked</span></div><div class="kpi"><span class="kpiLabel">Completed</span><b>${done}</b><span class="trend">${state.projects.length?Math.round(done/state.projects.length*100):0}%</span></div><div class="kpi"><span class="kpiLabel">Active</span><b>${state.projects.filter(p=>p.status!=='Completed').length}</b><span class="trend">Open work</span></div><div class="kpi"><span class="kpiLabel">Members</span><b>${state.team.members.length}</b><span class="trend">SRS Vision</span></div></section><div class="bottomGrid"><section class="panel"><div class="panelHead"><h3>Project Distribution</h3></div><div class="panelBody"><div class="donutBox"><div class="donut"><div class="donutLabel"><div><b>${state.projects.length}</b><small>Projects</small></div></div></div></div></div></section><section class="panel"><div class="panelHead"><h3>Revenue Overview</h3></div><div class="panelBody"><div class="chartWrap"><div class="chartBars">${[40,48,65,56,78,92].map((v,i)=>`<div class="chartBar"><i style="height:${v}%"></i><span>${['Apr','May','Jun','Jul','Aug','Sep'][i]}</span></div>`).join('')}</div></div></div></section></div>`;$('#reportPrint').onclick=()=>printHtml('SRS Vision Report',`Projects: ${state.projects.length}\nCompleted: ${done}\nActive: ${state.projects.length-done}\nTotal Project Value: ${money(total)}\nTeam Members: ${state.team.members.length}`)}
  function renderFiles(){const rows=state.files.map((f,i)=>`<div class="event"><div style="display:flex;justify-content:space-between"><div><b>${esc(f.name)}</b><small>${esc(f.type||'file')} · ${esc(f.date||nowDate())}</small></div><button class="btn danger" data-file-del="${i}">Delete</button></div></div>`).join('');$('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · FILES</div><div class="title">Project Files</div><div class="subtitle">Local file register; binary files are not pushed to Supabase.</div></div><label class="btn primary">＋ Upload<input id="fileUpload" type="file" hidden></label></div><section class="panel"><div class="panelHead"><h3>Files</h3></div><div class="panelBody events">${rows||'<div class="mutedBox">No files registered yet.</div>'}</div></section>`;$('#fileUpload').onchange=e=>{const f=e.target.files?.[0];if(!f)return;state.files.unshift({name:f.name,type:f.type,size:f.size,date:nowDate()});persist();renderFiles();notify('File added to project file register')};$$('[data-file-del]').forEach(b=>b.onclick=()=>{state.files.splice(Number(b.dataset.fileDel),1);persist();renderFiles()})}

  // ---------- Notifications / Money / Database / Settings ----------
  function renderNotifications(){const rows=state.social.notifications.map(n=>`<div class="notifRow"><span class="notifIcon">🔔</span><div><b>${esc(n.title)}</b><small>${esc(n.platform)} · ${esc(n.body)}</small></div><small>${esc(n.time||'')}</small></div>`).join('');$('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · NOTIFICATIONS</div><div class="title">Notification Center</div><div class="subtitle">One inbox for platform, team, project and system notifications.</div></div><button class="btn primary" id="notifTest">Test Notification</button></div><section class="panel"><div class="panelHead"><h3>Inbox</h3><span class="metaChip">${state.social.notifications.length} notifications</span></div><div class="panelBody">${rows||'<div class="mutedBox">No notifications.</div>'}</div></section>`;$('#notifTest').onclick=()=>{state.social.notifications.unshift({platform:'SRS Vision',title:'Test notification',body:'Notification center is working.',time:'Just now'});persist();renderNotifications();notify('Test notification created')}}
  function renderMoney(){
    const tr=state.finance.transfers;const approvals=MEMBERS.map((name,i)=>{const last=(tr[0]?.approvals||[]).find(x=>x.name===name);return `<div class="song"><div><b>${i+1}. ${esc(name)}</b><small>${last?.decision||'Waiting for response'}</small></div><button class="btn ${last?.decision==='Allow'?'green':''}" data-approve="${i}" data-decision="Allow">Allow</button><button class="btn ${last?.decision==='Deny'?'danger':''}" data-approve="${i}" data-decision="Deny">Deny</button></div>`}).join('');
    $('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · TRUST WORKFLOW</div><div class="title">Money Transfer Approval</div><div class="subtitle">A transfer cannot be approved until all ${MEMBERS.length} SRS Vision members allow it; one Deny blocks it.</div></div></div><section class="workspace"><div class="modalGrid"><div class="field"><label>Sender / Requesting Member</label><select class="select" id="txMember">${MEMBERS.map(x=>`<option>${x}</option>`).join('')}</select></div><div class="field"><label>Recipient Number / UPI / Account Reference</label><input class="input" id="txRecipient" placeholder="Enter recipient reference"></div><div class="field"><label>Amount (₹)</label><input class="input" id="txAmount" type="number" min="0" placeholder="0"></div><div class="field"><label>Purpose</label><input class="input" id="txPurpose" placeholder="Business purpose"></div></div><div class="heroActions"><button class="btn primary" id="txCreate">Create Transfer Request</button></div></section><section class="panel" style="margin-top:14px"><div class="panelHead"><h3>${tr[0]?'Current Request · '+esc(tr[0].amount?money(tr[0].amount):''): 'Approval Panel'}</h3><span class="metaChip">${tr[0]?`${tr[0].approvals.filter(x=>x.decision==='Allow').length}/${MEMBERS.length} Allow`: 'No request'}</span></div><div class="panelBody playlist">${tr[0]?approvals:'Create a transfer request first.'}</div>${tr[0]?`<div class="panelBody"><button class="btn ${tr[0].approvals.every(x=>x.decision==='Allow')?'primary':'danger'}" id="txExecute">${tr[0].approvals.every(x=>x.decision==='Allow')?`✅ All ${MEMBERS.length} Allowed — Approve Transfer`:`⛔ Transfer Blocked until all ${MEMBERS.length} Allow`}</button></div>`:''}</section>`;
    $('#txCreate').onclick=()=>{const amount=Number($('#txAmount').value||0);if(!amount||!$('#txRecipient').value.trim())return notify('Enter amount and recipient');state.finance.transfers.unshift({id:Date.now(),requester:$('#txMember').value,recipient:$('#txRecipient').value.trim(),amount,purpose:$('#txPurpose').value.trim(),status:'Pending',approvals:MEMBERS.map(name=>({name,decision:null}))});persist();renderMoney();notify('Transfer request created')};
    $$('[data-approve]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.approve);const d=b.dataset.decision;const req=state.finance.transfers[0];req.approvals[i].decision=d;req.status=req.approvals.every(x=>x.decision==='Allow')?'Approved':req.approvals.some(x=>x.decision==='Deny')?'Blocked':'Pending';persist();renderMoney();notify(d==='Deny'?`${MEMBERS[i]} denied — transfer blocked`: `${MEMBERS[i]} allowed`)})
    if($('#txExecute'))$('#txExecute').onclick=()=>{const req=state.finance.transfers[0];if(!req.approvals.every(x=>x.decision==='Allow'))return notify(`Transfer not approved: every one of the ${MEMBERS.length} members must Allow`);req.status='Approved for execution';state.finance.transactions.unshift({kind:'transfer-approved',amount:req.amount,recipient:req.recipient,date:nowDate()});persist();notify(`${MEMBERS.length}/${MEMBERS.length} approvals complete — transfer is approved for execution`);renderMoney()};
  }
  async function renderDatabase(){
    $('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · LIVE DATA</div><div class="title">Database & Realtime</div><div class="subtitle">One clean Supabase connection, with local fallback when the server is unavailable.</div></div><div><button class="btn primary" id="dbCheck">Check Connection</button></div></div><section class="kpis"><div class="kpi"><span class="kpiLabel">Connection</span><b id="dbConn">Checking…</b><span class="trend" id="dbConnSub">—</span></div><div class="kpi"><span class="kpiLabel">Realtime</span><b id="dbRT">Checking…</b><span class="trend">Postgres Changes</span></div><div class="kpi"><span class="kpiLabel">Pending Queue</span><b>${localStorage.getItem('srsVisionDirty')==='1'?'1':'0'}</b><span class="trend">Local changes</span></div><div class="kpi"><span class="kpiLabel">Members</span><b>${state.team.members.length}</b><span class="trend">SRS Vision</span></div></section><div class="bottomGrid"><section class="panel"><div class="panelHead"><h3>Connection Details</h3><button class="btn" id="dbReconnect">Reconnect</button></div><div class="panelBody"><div class="mutedBox" id="dbDetails">Checking Supabase…</div><div class="heroActions"><button class="btn cyan" id="dbSync">Sync Now</button><button class="btn" id="dbReload">Reload Shared Data</button><button class="btn" id="dbExport">Export Backup</button></div></div></section><section class="panel"><div class="panelHead"><h3>Required server setup</h3></div><div class="panelBody"><div class="events"><div class="event"><b>Anonymous Sign-In</b><small>Already enabled in your project.</small></div><div class="event"><b>Database SQL</b><small>Run the included database.sql once; it also migrates the legacy state row when present.</small></div><div class="event"><b>Realtime publication</b><small>public.srs_vision_state must be in supabase_realtime.</small></div><div class="event"><b>RLS / grants</b><small>Anonymous authenticated sessions must be allowed to read/write id = 1.</small></div></div></div></section></div>`;
    const check=async()=>{const ok=await Live.init();$('#dbConn').textContent=ok?'LIVE':'OFFLINE';$('#dbRT').textContent=Live.status==='online'?'ON':'OFF';$('#dbConnSub').textContent=Live.status;$('#dbDetails').innerHTML=ok?'<b>Supabase connection is working.</b><br>Shared state and Realtime are available.':`<b>${esc(Live.detail||'Connection failed')}</b><br>Use the included database.sql and confirm the Realtime publication.`};$('#dbCheck').onclick=check;$('#dbReconnect').onclick=async()=>{await Live.refresh();await check()};$('#dbSync').onclick=async()=>{await Live.writeNow(false);await check()};$('#dbReload').onclick=async()=>{try{if(!Live.client)await Live.init();const r=await Live.client.from('srs_vision_state').select('data').eq('id',1).single();if(r.error)throw r.error;state=mergeState(r.data);saveLocal();render();notify('Shared data reloaded')}catch(e){notify(e?.message||'Reload failed')}};$('#dbExport').onclick=()=>downloadBlob(JSON.stringify(state,null,2),'application/json','srs-vision-backup.json');await check();
  }
  function renderSettings(){
    $('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · SETTINGS</div><div class="title">Settings</div><div class="subtitle">Local appearance and platform preferences.</div></div></div><section class="workspace"><div class="modalGrid"><div class="field"><label>Theme</label><select class="select" id="setTheme"><option value="blue">Blue / Cyan / Purple</option><option value="purple">Purple</option><option value="green">Green</option></select></div><div class="field"><label>Platform notifications</label><select class="select"><option>Enabled</option><option>Browser permission required</option></select></div></div><div class="heroActions"><button class="btn primary" id="setSave">Save Settings</button><button class="btn" id="setReset">Reset Local State</button></div></section>`;$('#setTheme').value=settings.theme||'blue';$('#setSave').onclick=()=>{settings.theme=$('#setTheme').value;saveSettings();shell();renderRoute();notify('Settings saved')};$('#setReset').onclick=()=>{if(confirm('Reset only local website data?')){localStorage.removeItem(STORAGE_KEY);state=deepClone(initialState);persist();renderSettings();notify('Local state reset')}};
  }

  // ---------- Modal ----------
  let modalSave=null;
  function ensureModal(){if($('#modal'))return;document.body.insertAdjacentHTML('beforeend',`<div class="modal" id="modal"><div class="modalBox"><div class="modalHead"><h3 id="modalTitle">Edit</h3><button class="btn" id="modalClose">×</button></div><div id="modalBody"></div><div class="heroActions" style="justify-content:flex-end"><button class="btn ghost" id="modalCancel">Cancel</button><button class="btn primary" id="modalSave">Save</button></div></div></div>`);$('#modalClose').onclick=closeModal;$('#modalCancel').onclick=closeModal;$('#modalSave').onclick=()=>{try{modalSave?.();}catch(e){notify(e?.message||'Could not save')}}}
  function openModal(title,html,save){ensureModal();$('#modalTitle').textContent=title;$('#modalBody').innerHTML=html;modalSave=save;$('#modal').classList.add('open')}
  function closeModal(){const m=$('#modal');if(m)m.classList.remove('open');modalSave=null}
  window.openModal=openModal;window.closeModal=closeModal;

  function editProject(i){const p=state.projects[i];openModal('Edit Project',`<div class="modalGrid"><div class="field"><label>Project</label><input class="input" id="epName" value="${esc(p.name)}"></div><div class="field"><label>Client</label><input class="input" id="epClient" value="${esc(p.client)}"></div><div class="field"><label>Progress</label><input class="input" id="epProgress" type="number" min="0" max="100" value="${p.progress}"></div><div class="field"><label>Status</label><select class="select" id="epStatus"><option ${p.status==='Planning'?'selected':''}>Planning</option><option ${p.status==='In Progress'?'selected':''}>In Progress</option><option ${p.status==='Pending'?'selected':''}>Pending</option><option ${p.status==='Completed'?'selected':''}>Completed</option></select></div><div class="field"><label>Value</label><input class="input" id="epValue" type="number" value="${p.value}"></div><div class="field"><label>Member</label><select class="select" id="epMember">${MEMBERS.map(x=>`<option ${x===p.member?'selected':''}>${x}</option>`).join('')}</select></div></div>`,()=>{p.name=$('#epName').value.trim()||p.name;p.client=$('#epClient').value.trim();p.progress=Number($('#epProgress').value||0);p.status=$('#epStatus').value;p.value=Number($('#epValue').value||0);p.member=$('#epMember').value;persist();closeModal();renderMain();notify('Project updated')})}

  function downloadBlob(text,type,name){const u=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),500)}
  function downloadData(data,name){const a=document.createElement('a');a.href=data;a.download=name;a.click()}
  function printHtml(title,body){const w=window.open('','_blank','width=900,height=800');if(!w)return;w.document.write(`<!doctype html><html><head><title>${esc(title)}</title><style>body{font:16px/1.6 Arial;padding:40px}h1{margin-top:0;white-space:pre-wrap}</style></head><body><h1>${esc(title)}</h1><div style="white-space:pre-wrap">${esc(body)}</div></body></html>`);w.document.close();setTimeout(()=>w.print(),250)}

  // ---------- Router ----------
  function renderRoute(){
    renderHeaderStatus();
    if(route==='dashboard')return renderMain();
    if(route==='team')return renderTeam();
    if(route==='projects')return renderProjects();
    if(route==='calendar')return renderCalendar();
    if(route==='reports')return renderReports();
    if(route==='files')return renderFiles();
    if(route==='notifications')return renderNotifications();
    if(route==='money-transfer')return renderMoney();
    if(route==='database')return renderDatabase();
    if(route==='settings')return renderSettings();
    if(TOOL_META[route])return renderTool(route);
    return navigate('dashboard');
  }

  document.addEventListener('click',e=>{
    const n=e.target.closest?.('[data-nav]');if(n){e.preventDefault();navigate(n.dataset.nav);return;}
    const m=e.target.closest?.('[data-member-edit]');if(m){editMember(Number(m.dataset.memberEdit));return;}
    const c=e.target.closest?.('[data-member-custom]');if(c){const i=Number(c.dataset.memberCustom);const m=state.team.members[i];openModal(`Custom fields · ${m.name}`,`<div class="field"><label>Skills</label><input class="input" id="cSkills" value="${esc(m.skills)}"></div><div class="field" style="margin-top:10px"><label>Availability</label><input class="input" id="cAvail" value="${esc(m.notes)}" placeholder="e.g. Mon-Fri"></div>`,()=>{m.skills=$('#cSkills').value.trim();m.notes=$('#cAvail').value.trim();persist();closeModal();renderTeam()});return;}
    const d=e.target.closest?.('[data-member-delete]');if(d){const i=Number(d.dataset.memberDelete);if(confirm(`Remove ${state.team.members[i].name}?`)){state.team.members.splice(i,1);persist();renderTeam()}return;}
    if(e.target.closest?.('[data-add-member]')){openModal('Add SRS Vision Member',`<div class="modalGrid"><div class="field"><label>Name</label><input class="input" id="amName"></div><div class="field"><label>Role</label><input class="input" id="amRole" value="Team Member"></div><div class="field"><label>Service</label><input class="input" id="amService"></div><div class="field"><label>Phone</label><input class="input" id="amPhone"></div></div>`,()=>{const name=$('#amName').value.trim();if(!name)throw new Error('Enter a name');state.team.members.push({id:'m'+Date.now(),name,role:$('#amRole').value||'Team Member',service:$('#amService').value||'',phone:$('#amPhone').value||'',description:'',skills:'',notes:''});persist();closeModal();renderTeam();notify('Member added')});return;}
  });

  $('#app')?.addEventListener('keydown',e=>{if(e.key==='/'&&e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'){e.preventDefault();$('#globalSearch')?.focus()}});
  window.addEventListener('storage',e=>{if(e.key===STORAGE_KEY){state=loadLocal();renderRoute()}});
  window.addEventListener('online',()=>Live.init());
  window.addEventListener('pagehide',()=>{if(Live.dirty)Live.writeNow(false)});
  window.addEventListener('hashchange',()=>{const h=location.hash.replace('#','');if(h&&h!==route){route=h;shell();renderRoute()}});

  ensureModal();
  const initialHash=location.hash.replace('#','');if(initialHash && (initialHash==='dashboard'||initialHash==='team'||initialHash==='projects'||initialHash==='calendar'||initialHash==='reports'||initialHash==='files'||initialHash==='notifications'||initialHash==='money-transfer'||initialHash==='database'||initialHash==='settings'||TOOL_META[initialHash]))route=initialHash;
  shell();renderRoute();
  setTimeout(()=>Live.init(),50);
})();
