(() => {
  'use strict';

  /* ----------------------------- DATA ---------------------------------- */
  const MEMBERS = [
    'Gagan','Teja Swaroop','Chinmayee','Deepika','Geetha','Sinchana',
    'Gangaraju','Ganesh','Girish','Gagana','Gangothri','Prabhakar','Kushanth'
  ];

  const CATEGORIES = [
    ['graphic-design','✦','Graphic Design','Design work and creative assets'],
    ['ai-tools','✧','AI Tools','AI assistants and platforms'],
    ['social-media','◎','Social Media','Social platforms and notifications'],
    ['video-tools','▶','Video Tools','Video editing and production'],
    ['image-tools','▧','Image Tools','Image editing and enhancement'],
    ['document-tools','▤','Document Tools','Docs, knowledge and writing'],
    ['pdf-tools','PDF','PDF Tools','Read, edit and convert PDFs'],
    ['productivity-tools','✓','Productivity','Tasks, notes and planning'],
    ['developer-tools','</>','Developer Tools','Code, testing and dev apps'],
    ['business-tools','₹','Business Tools','Invoices and business utilities'],
    ['education-tools','⌘','Education Tools','Study and learning'],
    ['entertainment-tools','🎮','Entertainment','Games and media'],
    ['utilities-tools','⚡','Utilities','Everyday utilities'],
    ['music','♫','Music Player','Music player and streaming apps']
  ];

  const APPS = {
    'graphic-design': [
      ['Canva','Design suite','https://www.canva.com/'],
      ['Adobe Express','Quick creative editor','https://www.adobe.com/express/'],
      ['Figma','UI/UX design','https://www.figma.com/'],
      ['Photopea','Browser image editor','https://www.photopea.com/'],
      ['Unsplash','Free image library','https://unsplash.com/'],
      ['Google Fonts','Font library','https://fonts.google.com/'],
      ['Noun Project','Icons library','https://thenounproject.com/']
    ],
    'ai-tools': [
      ['ChatGPT','AI assistant','https://chatgpt.com/'],
      ['Gemini','Google AI','https://gemini.google.com/'],
      ['Claude','AI assistant','https://claude.ai/'],
      ['Microsoft Copilot','Microsoft AI','https://copilot.microsoft.com/'],
      ['Perplexity','AI search','https://www.perplexity.ai/']
    ],
    'social-media': [
      ['WhatsApp','Web messaging','https://web.whatsapp.com/'],
      ['Instagram','Posts, reels and DMs','https://www.instagram.com/'],
      ['WhatsApp Channel','Channels','https://www.whatsapp.com/'],
      ['YouTube','Studio, uploads and comments','https://studio.youtube.com/'],
      ['Pinterest','Pins and boards','https://www.pinterest.com/'],
      ['Facebook','Pages and messages','https://www.facebook.com/'],
      ['LinkedIn','Company and leads','https://www.linkedin.com/'],
      ['Telegram','Web messaging','https://web.telegram.org/'],
      ['X','Posts and messages','https://x.com/']
    ],
    'video-tools': [
      ['CapCut','Video editing','https://www.capcut.com/'],
      ['Alight Motion','Motion graphics','https://alightmotion.com/'],
      ['VN','Video editor','https://www.vlognow.me/'],
      ['Clipchamp','Microsoft video editor','https://app.clipchamp.com/'],
      ['OpenShot','Open-source video editor','https://www.openshot.org/'],
      ['DaVinci Resolve','Professional editor','https://www.blackmagicdesign.com/products/davinciresolve'],
      ['VSDC Free Video Editor','Windows video editor','https://www.videosoftdev.com/']
    ],
    'image-tools': [
      ['Adobe Express','Image and design editor','https://www.adobe.com/express/'],
      ['Photo Editor','Browser-side quick editor','https://www.photopea.com/'],
      ['Microsoft Photos','Windows Photos app','https://support.microsoft.com/en-us/windows/photos'],
      ['Microsoft Clipchamp','Microsoft creative editor','https://app.clipchamp.com/'],
      ['Photoshop','Professional image editor','https://www.adobe.com/products/photoshop.html']
    ],
    'document-tools': [
      ['GitBook','Documentation','https://www.gitbook.com/'],
      ['Mintlify','Developer docs','https://mintlify.com/'],
      ['Confluence','Team knowledge base','https://www.atlassian.com/software/confluence'],
      ['Notion','Docs and workspace','https://www.notion.so/']
    ],
    'pdf-tools': [
      ['PDFgear','PDF editor','https://www.pdfgear.com/'],
      ['PDF24 Creator','PDF toolkit','https://tools.pdf24.org/en/'],
      ['Foxit PDF Reader','PDF reader','https://www.foxit.com/pdf-reader/'],
      ['Microsoft Edge','Built-in PDF reader','https://www.microsoft.com/edge/'],
      ['Adobe Acrobat Online','Online PDF tools','https://www.adobe.com/acrobat/online.html']
    ],
    'developer-tools': [
      ['VS Code','Code editor','https://code.visualstudio.com/'],
      ['CodePen','Front-end playground','https://codepen.io/'],
      ['Lovable','AI app builder','https://lovable.dev/'],
      ['Rocket','Agentic code editor','https://github.com/Rahuletto/rocket'],
      ['Claude Code','Terminal coding agent','https://claude.ai/']
    ],
    'music': [
      ['Spotify','Music streaming','https://open.spotify.com/'],
      ['JioSaavn','Indian music and podcasts','https://www.jiosaavn.com/'],
      ['YouTube Music','Music streaming','https://music.youtube.com/'],
      ['Apple Music','Music streaming','https://music.apple.com/'],
      ['Amazon Music','Music streaming','https://music.amazon.com/']
    ],
    'business-tools': [
      ['Google Sheets','Business spreadsheet','https://docs.google.com/spreadsheets/'],
      ['Microsoft Excel Online','Spreadsheet','https://www.office.com/launch/excel'],
      ['Zoho Books','Accounting platform','https://www.zoho.com/books/']
    ],
    'productivity-tools': [
      ['Google Calendar','Calendar','https://calendar.google.com/'],
      ['Trello','Boards and tasks','https://trello.com/'],
      ['Asana','Project management','https://app.asana.com/']
    ]
  };

  const TOOL_META = Object.fromEntries(CATEGORIES.map(([id,icon,title,desc]) => [id,{icon,title,desc}]));

  const STORAGE_KEY = 'srsVisionUltimateStateV1';
  const SETTINGS_KEY = 'srsVisionUltimateSettingsV1';

  function defaultMember(name,i){ return {id:'m'+(i+1),name,role:'Team Member',service:'',description:'',phone:'',skills:'',notes:''}; }

  const initialState = {
    company:{name:'SRS VISION',tagline:'YOUR VISION • OUR CREATION'},
    account:{name:'SRS Vision Workspace',email:'',phone:'',role:'Workspace Member'},
    projects:[
      {id:'p1',name:'Brand Identity',client:'Nova Tech',progress:80,status:'In Progress',due:'2026-10-02',value:28000,member:'Gagan'},
      {id:'p2',name:'Social Media Creative',client:'Bright Mart',progress:60,status:'Planning',due:'2026-10-05',value:16000,member:'Chinmayee'},
      {id:'p3',name:'Poster Design',client:'Green Earth',progress:40,status:'In Progress',due:'2026-10-12',value:9000,member:'Deepika'},
      {id:'p4',name:'Packaging Design',client:'Organic Foods',progress:20,status:'Pending',due:'2026-10-20',value:22000,member:'Gangothri'}
    ],
    clients:[{id:'c1',name:'Nova Tech',service:'Brand Identity',status:'Active',phone:''},{id:'c2',name:'Bright Mart',service:'Social Media',status:'Lead',phone:''}],
    team:{name:'SRS VISION',members:MEMBERS.map(defaultMember)},
    tasks:[{id:'t1',title:'Prepare brand review',done:false,priority:'High'},{id:'t2',title:'Send client proof',done:false,priority:'Medium'},{id:'t3',title:'Update project tracker',done:true,priority:'Low'}],
    notes:[],
    social:{drafts:[],notifications:[],connected:{}},
    finance:{transactions:[],bankAccounts:[{id:'b1',bank:'Business Account',holder:'SRS VISION',type:'Current',last4:'0001',balance:0},{id:'b2',bank:'Operations Account',holder:'SRS VISION',type:'Savings',last4:'0002',balance:0}],transfers:[]},
    files:[],
    calendar:[{id:'e1',title:'Client Review',date:'2026-10-02',time:'11:00',type:'Meeting'},{id:'e2',title:'Poster Delivery',date:'2026-10-12',time:'15:00',type:'Deadline'}],
    invoices:[],
    ai:{history:[]},
    music:{playlist:[]},
    customApps:Object.fromEntries(CATEGORIES.map(([id])=>[id,[]]))
  };

  let state = loadState();
  let settings = loadSettings();
  let route = location.hash.replace('#','') || 'dashboard';
  let toastTimer = 0;
  let currentAudio = null;
  let audioObjectUrls = [];

  const $ = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
  const esc = (v='')=>String(v).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const initials = (v='')=>v.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()||'?';
  const money = n=>'₹ '+Number(n||0).toLocaleString('en-IN');
  const today = ()=>new Date().toISOString().slice(0,10);
  const uid = p=>p+Date.now()+Math.random().toString(36).slice(2,7);

  function clone(v){ return JSON.parse(JSON.stringify(v)); }
  function mergeDefaults(raw){
    const s=clone(initialState);
    if(raw&&typeof raw==='object'){
      for(const k of ['company','account','team']) if(raw[k]&&typeof raw[k]==='object') s[k]={...s[k],...raw[k]};
      for(const k of ['projects','clients','tasks','notes','files','calendar','invoices']) if(Array.isArray(raw[k])) s[k]=raw[k];
      if(raw.social) s.social={...s.social,...raw.social,notifications:Array.isArray(raw.social.notifications)?raw.social.notifications:[],drafts:Array.isArray(raw.social.drafts)?raw.social.drafts:[],connected:{...s.social.connected,...(raw.social.connected||{})}};
      if(raw.finance) s.finance={...s.finance,...raw.finance,transactions:Array.isArray(raw.finance.transactions)?raw.finance.transactions:[],transfers:Array.isArray(raw.finance.transfers)?raw.finance.transfers:[],bankAccounts:Array.isArray(raw.finance.bankAccounts)?raw.finance.bankAccounts:s.finance.bankAccounts};
      if(raw.ai) s.ai={...s.ai,...raw.ai,history:Array.isArray(raw.ai.history)?raw.ai.history:[]};
      if(raw.music) s.music={...s.music,...raw.music,playlist:Array.isArray(raw.music.playlist)?raw.music.playlist:[]};
      if(raw.customApps) s.customApps={...s.customApps,...raw.customApps};
    }
    s.team.name='SRS VISION';
    const existing=new Map((Array.isArray(s.team.members)?s.team.members:[]).map(m=>[String(m?.name||'').trim().toLowerCase(),m]));
    s.team.members=MEMBERS.map((name,i)=>{const old=existing.get(name.toLowerCase());return old?{...defaultMember(name,i),...old,name}:defaultMember(name,i)});
    for(const [id] of CATEGORIES) if(!Array.isArray(s.customApps[id])) s.customApps[id]=[];
    return s;
  }
  function loadState(){try{return mergeDefaults(JSON.parse(localStorage.getItem(STORAGE_KEY)||'null'))}catch{return clone(initialState)}}
  function saveLocal(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));localStorage.setItem('srsVisionLastLocalWrite',String(Date.now()));}
  function loadSettings(){try{return JSON.parse(localStorage.getItem(SETTINGS_KEY)||'{"theme":"blue"}')}catch{return {theme:'blue'}}}
  function saveSettings(){localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));}
  function notify(msg){const el=$('#toast');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2400)}
  function markDirty(){localStorage.setItem('srsVisionDirty','1')}
  function persist(){saveLocal();markDirty();Live.scheduleSave()}

  /* ------------------------- SUPABASE / REALTIME ----------------------- */
  const Live={
    client:null,session:null,channel:null,initPromise:null,saveTimer:null,retryTimer:null,writeChain:Promise.resolve(),status:'local',detail:'',dirty:false,
    setStatus(st,msg){this.status=st;this.detail=msg||'';updateDbStatus()},
    async ensure(){
      const cfg=window.SRS_SUPABASE_CONFIG||{};
      if(!cfg.url||!cfg.publishableKey||!window.supabase) throw new Error('Supabase library/config missing');
      if(!this.client) this.client=window.supabase.createClient(cfg.url,cfg.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
      let s=await this.client.auth.getSession();
      if(s.error) throw s.error;
      let session=s.data?.session||null;
      if(!session){
        const a=await this.client.auth.signInAnonymously();
        if(a.error) throw a.error;
        session=a.data?.session||null;
      }
      if(!session) throw new Error('Anonymous session was not returned');
      this.session=session;
      return session;
    },
    async init(){
      if(this.initPromise) return this.initPromise;
      this.initPromise=(async()=>{
        try{
          this.setStatus('connecting','Connecting to Supabase…');
          await this.ensure();
          const r=await this.client.from('srs_vision_state').select('id,data,updated_at').eq('id',1).maybeSingle();
          if(r.error) throw r.error;
          const remote=r.data;
          const dirty=localStorage.getItem('srsVisionDirty')==='1';
          if(remote?.data&&Object.keys(remote.data).length&&!dirty){state=mergeDefaults(remote.data);saveLocal();localStorage.setItem('srsVisionDirty','0');}
          else if(dirty){await this.writeNow(false);}
          else {await this.writeNow(false);}
          await this.subscribe();
          this.setStatus('online','Supabase connected · realtime ON');
          return true;
        }catch(e){
          console.warn('SRS Vision Supabase init:',e);
          this.setStatus('error',e?.message||'Supabase connection failed');
          this.scheduleRetry();
          return false;
        }finally{this.initPromise=null;}
      })();
      return this.initPromise;
    },
    async subscribe(){
      if(!this.client)return;
      if(this.channel){try{await this.channel.unsubscribe()}catch{}this.channel=null;}
      this.channel=this.client.channel('srs-vision-state-live').on('postgres_changes',{event:'*',schema:'public',table:'srs_vision_state',filter:'id=eq.1'},payload=>{
        if(!payload?.new?.data)return;
        const stamp=new Date(payload.new.updated_at||0).getTime();
        const localStamp=Number(localStorage.getItem('srsVisionLastRemoteWrite')||0);
        if(stamp>=localStamp && localStorage.getItem('srsVisionDirty')!=='1'){
          state=mergeDefaults(payload.new.data);saveLocal();renderRoute();
        }
        this.setStatus('online','Supabase connected · realtime ON');
      }).subscribe(st=>{
        if(st==='SUBSCRIBED')this.setStatus('online','Supabase connected · realtime ON');
        if(st==='CHANNEL_ERROR'||st==='TIMED_OUT')this.setStatus('error','Realtime reconnecting…');
      });
    },
    scheduleSave(){clearTimeout(this.saveTimer);this.saveTimer=setTimeout(()=>this.writeNow(false),350);},
    async writeNow(force=false){
      if(!this.client||!this.session){if(!force){this.init();return false;}await this.ensure();}
      return this.writeChain=this.writeChain.then(async()=>{
        try{
          this.setStatus('saving','Saving to Supabase…');
          const payload=clone(state); payload.files=payload.files.map(f=>({name:f.name,type:f.type,size:f.size,date:f.date})); if(payload.music?.playlist) payload.music.playlist=payload.music.playlist.map(x=>({id:x.id,name:String(x.name||'Track')}));
          let r=await this.client.rpc('srs_vision_merge_state',{p_patch:payload});
          if(r.error){
            r=await this.client.from('srs_vision_state').upsert({id:1,data:payload,updated_at:new Date().toISOString(),updated_by:this.session?.user?.id||null},{onConflict:'id'}).select('id,data,updated_at').single();
          }
          if(r.error)throw r.error;
          localStorage.setItem('srsVisionDirty','0');
          localStorage.setItem('srsVisionLastRemoteWrite',String(Date.now()));
          this.setStatus('online','Saved globally · realtime ON');
          return true;
        }catch(e){
          this.setStatus('error',e?.message||'Save failed; kept locally');
          localStorage.setItem('srsVisionDirty','1');
          this.scheduleRetry();
          return false;
        }
      });
    },
    scheduleRetry(){clearTimeout(this.retryTimer);this.retryTimer=setTimeout(()=>{this.init()},3500)},
    async refresh(){if(this.channel){try{await this.channel.unsubscribe()}catch{}this.channel=null;}this.client=null;this.session=null;return this.init();}
  };
  window.SRSVisionLive=Live;

  function updateDbStatus(){const el=$('#dbStatus');if(!el)return;const map={online:['live','Live','Database Connected'],connecting:['dot','Connecting','Connecting…'],saving:['dot','Saving','Syncing…'],error:['err','Offline','Local fallback'],local:['dot','Local','Browser storage']};const v=map[Live.status]||map.local;el.innerHTML=`<span class="dot ${v[0]}"></span><span><b>${v[1]}</b><small>${esc(v[2])}</small></span>`}

  /* ------------------------------ SHELL -------------------------------- */
  const topNav=[['dashboard','⌂','Dashboard'],['projects','▣','Projects'],['team','♧','Teams'],['calendar','📅','Calendar'],['reports','▥','Reports']];
  const manageNav=[['accounts','₹','Accounts'],['banking','🏦','Banking'],['clients','♙','Clients'],['files','📁','Files'],['notifications','🔔','Notifications'],['money-transfer','💸','Money Transfer']];
  function navButton([r,i,l]){return `<button class="navitem ${route===r?'active':''}" data-nav="${r}"><span class="icon">${i}</span>${l}</button>`}
  function shell(){
    document.body.className=`theme-${settings.theme||'blue'}`;
    $('#app').innerHTML=`<div class="app">
      <aside class="sidebar">
        <div class="brand"><img src="assets/srs-vision-logo.png" alt="SRS Vision"><div><h1>SRS VISION</h1><small>${esc(state.company.tagline)}</small></div></div>
        <div class="navgroup"><div class="navlabel">Main</div>${topNav.map(navButton).join('')}</div>
        <div class="navgroup"><div class="navlabel">Management</div>${manageNav.map(navButton).join('')}</div>
        <div class="navgroup"><div class="navlabel">System</div>${navButton(['app-manager','🧩','App Manager'])}${navButton(['database','●','Live Database'])}${navButton(['settings','⚙','Settings'])}</div>
        <div class="sidebarQuote"><b>Creative<br>Ideas<br>Build<br>Better<br>Tomorrow</b><i></i></div>
      </aside>
      <main class="mainwrap">
        <header class="topbar">
          <div class="topbrand"><img src="assets/srs-vision-logo.png" alt="SRS Vision"><b>SRS VISION</b></div>
          <nav class="topnav">${topNav.map(navButton).join('')}</nav>
          <div class="search"><span>⌕</span><input id="globalSearch" placeholder="Search tools, projects, team members…"></div>
          <div class="topactions"><button class="bell" data-nav="notifications" title="Notifications">🔔</button><button class="status" id="dbStatus" data-nav="database" title="Database"></button><button class="btn ghost backBtn" id="backBtn" title="Go back">← Back</button><button class="user" data-nav="account"><span class="avatar">SV</span><span><b>SRS Vision</b><small>Workspace</small></span></button></div>
        </header>
        <div class="content" id="content"></div>
      </main>
    </div><nav class="mobileNav">${[['dashboard','⌂','Home'],['projects','▣','Projects'],['team','♧','Teams'],['notifications','🔔','Alerts'],['app-manager','🧩','Apps']].map(navButton).join('')}</nav>`;
    updateDbStatus();
    $('#backBtn').onclick=goBack;
    $('#globalSearch').oninput=e=>renderSearchResults(e.target.value);
  }
  function goBack(){if(history.length>1){history.back()}else navigate('dashboard')}
  function navigate(r){if(!r)return;route=r;history.pushState({route:r},'',`#${r}`);shell();renderRoute();}
  window.addEventListener('popstate',()=>{route=location.hash.replace('#','')||'dashboard';shell();renderRoute()});
  window.addEventListener('hashchange',()=>{const h=location.hash.replace('#','')||'dashboard';if(h!==route){route=h;shell();renderRoute()}});

  function renderSearchResults(q){if(!q){renderRoute();return}q=q.toLowerCase();const tools=CATEGORIES.filter(x=>x.slice(2).some(v=>String(v).toLowerCase().includes(q)));const projects=state.projects.filter(p=>[p.name,p.client,p.member].join(' ').toLowerCase().includes(q));const members=state.team.members.filter(m=>m.name.toLowerCase().includes(q));$('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SEARCH</div><div class="title">Results</div><div class="subtitle">${esc(q)}</div></div></div><div class="workspaceCards">${tools.map(x=>`<button class="miniTool" data-nav="${x[0]}"><b>${x[1]} ${esc(x[2])}</b><small>${esc(x[3])}</small></button>`).join('')}${projects.map((p,i)=>`<button class="miniTool" data-project-search="${i}"><b>▣ ${esc(p.name)}</b><small>${esc(p.client)} · ${esc(p.member)}</small></button>`).join('')}${members.map((m,i)=>`<button class="miniTool" data-member-search="${i}"><b>♧ ${esc(m.name)}</b><small>${esc(m.role)}</small></button>`).join('')||'<div class="mutedBox">No matching results.</div>'}</div>`;$$('[data-nav]').forEach(b=>b.onclick=()=>navigate(b.dataset.nav));$$('[data-project-search]').forEach(b=>b.onclick=()=>{navigate('projects');setTimeout(()=>editProject(Number(b.dataset.projectSearch)),0)});$$('[data-member-search]').forEach(b=>b.onclick=()=>{navigate('team');setTimeout(()=>editMember(Number(b.dataset.memberSearch)),0)})}

  /* --------------------------- MAIN DASHBOARD --------------------------- */
  function renderMain(){
    const p=state.projects, active=p.filter(x=>x.status!=='Completed').length, done=p.filter(x=>x.status==='Completed').length, value=p.reduce((a,x)=>a+Number(x.value||0),0);
    const activity=[
      ['✦','Project tracker',`${p[0]?.name||'No project'} updated`,'Now'],
      ['♧','SRS Vision team',`${state.team.members.length} members in one team`,'Today'],
      ['◉','Database',Live.status==='online'?'Live sync enabled':'Local fallback','Today'],
      ['♫','Music',`${state.music.playlist.length} local track(s)`,'Today'],
      ['🔔','Notifications',`${state.social.notifications.length} notification(s)`,'Today']
    ].map(a=>`<div class="activityItem"><span class="aicon">${a[0]}</span><div><b>${a[1]}</b><small>${esc(a[2])} · ${a[3]}</small></div></div>`).join('');
    const rows=p.slice(0,5).map((x,i)=>`<div class="projectRow"><div class="thumb">${['BD','SM','PD','PK','GD'][i%5]}</div><div><div class="projectName">${esc(x.name)}</div><div class="projectSub">${esc(x.client)} · ${esc(x.member)}</div></div><div><div class="bar"><i style="width:${Math.max(0,Math.min(100,Number(x.progress)||0))}%"></i></div><div class="projectSub">${Number(x.progress)||0}%</div></div><span class="pill ${x.status==='Completed'?'done':x.status==='Planning'?'planning':x.status==='Pending'?'pending':'progress'}">${esc(x.status)}</span><button class="btn ghost" data-edit-project="${p.indexOf(x)}">⋮</button></div>`).join('');
    const people=state.team.members.slice(0,8).map(m=>`<span class="tinyA" title="${esc(m.name)}">${initials(m.name)}</span>`).join('');
    const events=state.calendar.slice(0,5).map(e=>`<div class="event"><b>${esc(e.title)}</b><small>${esc(e.date)} · ${esc(e.time||'Any time')}</small></div>`).join('')||'<div class="mutedBox">No events yet.</div>';
    const apps=CATEGORIES.map(([id,icon,title,desc])=>`<button class="toolSlot" data-nav="${id}"><div class="toolIcon">${icon}</div><b>${esc(title)}</b><small>${esc(desc)}</small></button>`).join('');
    const accountBalance=state.finance.bankAccounts.reduce((a,b)=>a+Number(b.balance||0),0);
    $('#content').innerHTML=`
      <section class="heroImage"><div class="heroOverlay"><div class="eyebrow">SRS VISION · MAIN DASHBOARD</div><h2>Good Evening,<br><span>SRS Vision</span></h2><p>Your creative operations at a glance</p><div class="heroActions"><button class="btn primary" data-nav="app-manager">Open All Tools</button><button class="btn ghost" data-nav="music">Open Music</button></div></div></section>
      <section class="kpis"><div class="kpi"><div class="kpiTop"><span class="kpiLabel">Total Projects</span><span>▣</span></div><b>${p.length}</b><span class="trend">↑ ${active} active</span><small class="kpiHint">live tracker</small></div><div class="kpi"><div class="kpiTop"><span class="kpiLabel">Team Members</span><span>♧</span></div><b>${state.team.members.length}</b><span class="trend">SRS Vision</span><small class="kpiHint">single shared team</small></div><div class="kpi"><div class="kpiTop"><span class="kpiLabel">Active Work</span><span>✓</span></div><b>${active}</b><span class="trend">${done} completed</span><small class="kpiHint">project pipeline</small></div><div class="kpi"><div class="kpiTop"><span class="kpiLabel">Tracked Value</span><span>₹</span></div><b>${money(value)}</b><span class="trend">Accounts ${money(accountBalance)}</span><small class="kpiHint">internal ledger</small></div></section>
      <div class="grid"><section class="panel"><div class="panelHead"><h3>Recent Projects</h3><button class="btn ghost" data-nav="projects">View All →</button></div><div class="panelBody">${rows||'<div class="mutedBox">No projects yet.</div>'}</div></section><section class="panel"><div class="panelHead"><h3>Team Overview</h3><button class="btn ghost" data-nav="team">View All →</button></div><div class="panelBody"><div class="teamMini"><div class="teamTop"><b>SRS VISION</b><span class="teamCount">${state.team.members.length}</span></div><div class="projectSub">All members belong to one shared SRS Vision team</div><div class="people">${people}<span class="tinyA">+${Math.max(0,state.team.members.length-8)}</span></div></div><div class="membersMeta"><span class="metaChip">${state.team.members.length} members</span><span class="metaChip">Editable</span></div></div></section><section class="panel"><div class="panelHead"><h3>Recent Activity</h3><button class="btn ghost" data-nav="notifications">View All →</button></div><div class="panelBody activity">${activity}</div></section></div>
      <div class="bottomGrid"><section class="panel"><div class="panelHead"><h3>Calendar</h3><button class="btn ghost" data-nav="calendar">Open Calendar →</button></div><div class="panelBody calendar"><div><div class="calgrid">${['S','M','T','W','T','F','S'].map(x=>`<div class="calday head">${x}</div>`).join('')}${Array.from({length:35},(_,i)=>`<div class="calday ${i===17?'today':''}">${(i%30)+1}</div>`).join('')}</div></div><div><div class="eyebrow" style="margin-bottom:10px">UPCOMING</div><div class="events">${events}</div></div></div></section><section class="panel"><div class="panelHead"><h3>Project Performance</h3><button class="btn ghost" data-nav="reports">View All →</button></div><div class="panelBody"><div style="display:grid;grid-template-columns:170px 1fr;gap:14px;align-items:center"><div class="donut"><div class="donutLabel"><div><b>${p.length}</b><small>Projects</small></div></div></div><div class="legend"><div><span><i class="dotL" style="background:#16d7ff"></i>Active</span><b>${active}</b></div><div><span><i class="dotL" style="background:#7e4cff"></i>Completed</span><b>${done}</b></div><div><span><i class="dotL" style="background:#ffd15a"></i>Pending</span><b>${p.filter(x=>x.status==='Pending').length}</b></div><div><span><i class="dotL" style="background:#ef4fc6"></i>Planning</span><b>${p.filter(x=>x.status==='Planning').length}</b></div></div></div></div></section></div>
      <section class="panel" style="margin-top:16px"><div class="panelHead"><h3>Tool Slots</h3><span class="subtitle">Each slot opens its own dedicated dashboard</span></div><div class="panelBody"><div class="toolGrid">${apps}</div></div></section>`;
    $$('[data-edit-project]').forEach(b=>b.onclick=()=>editProject(Number(b.dataset.editProject)));
  }

  /* ------------------------------ TEAM --------------------------------- */
  function renderTeam(){
    const cards=state.team.members.map((m,i)=>`<article class="member"><div class="memberHead"><div class="memberAvatar">${initials(m.name)}</div><div><h4>${esc(m.name)}</h4><small>${esc(m.role||'Team Member')}</small></div></div><div class="projectSub" style="margin-top:8px">${esc(m.service||'Service not set')}</div><div class="projectSub">${esc(m.description||'SRS Vision member')}</div><div class="memberActions"><button class="btn primary" data-member-edit="${i}">✎ Edit</button><button class="btn" data-member-custom="${i}">⚙ Custom</button><button class="btn danger" data-member-delete="${i}">Remove</button></div></article>`).join('');
    $('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · TEAM MANAGEMENT</div><div class="title">SRS VISION</div><div class="subtitle">One shared team · ${state.team.members.length} members · fully editable</div></div><div><button class="btn primary" data-add-member>＋ Add Member</button></div></div><div class="membersMeta"><span class="metaChip">${state.team.members.length} Members</span><span class="metaChip">Single Team</span><span class="metaChip">Realtime Ready</span></div><section class="panel"><div class="panelHead"><h3>All SRS Vision Members</h3><button class="btn ghost" data-nav="money-transfer">Open 13-member approval →</button></div><div class="panelBody"><div class="memberGrid">${cards}</div></div></section>`;
  }
  function editMember(i){const m=state.team.members[i];if(!m)return;openModal(`Edit ${m.name}`,`<div class="modalGrid"><div class="field"><label>Name</label><input class="input" id="mName" value="${esc(m.name)}"></div><div class="field"><label>Role</label><input class="input" id="mRole" value="${esc(m.role)}"></div><div class="field"><label>Service</label><input class="input" id="mService" value="${esc(m.service)}"></div><div class="field"><label>Phone</label><input class="input" id="mPhone" value="${esc(m.phone)}"></div><div class="field"><label>Skills</label><input class="input" id="mSkills" value="${esc(m.skills)}"></div><div class="field"><label>Description</label><input class="input" id="mDesc" value="${esc(m.description)}"></div><div class="field" style="grid-column:1/-1"><label>Notes</label><textarea class="textarea" id="mNotes">${esc(m.notes)}</textarea></div></div>`,()=>{m.name=$('#mName').value.trim()||m.name;m.role=$('#mRole').value.trim()||'Team Member';m.service=$('#mService').value.trim();m.phone=$('#mPhone').value.trim();m.skills=$('#mSkills').value.trim();m.description=$('#mDesc').value.trim();m.notes=$('#mNotes').value.trim();persist();closeModal();renderTeam();notify('Member updated and saved')});}
  function addMember(){openModal('Add SRS Vision Member',`<div class="modalGrid"><div class="field"><label>Name</label><input class="input" id="amName"></div><div class="field"><label>Role</label><input class="input" id="amRole" value="Team Member"></div><div class="field"><label>Service</label><input class="input" id="amService"></div><div class="field"><label>Phone</label><input class="input" id="amPhone"></div></div>`,()=>{const name=$('#amName').value.trim();if(!name)throw new Error('Enter a name');state.team.members.push({id:uid('m'),name,role:$('#amRole').value.trim()||'Team Member',service:$('#amService').value.trim(),phone:$('#amPhone').value.trim(),description:'',skills:'',notes:''});persist();closeModal();renderTeam();notify('Member added')});}

  /* ------------------------------ PROJECTS ------------------------------ */
  function renderProjects(){const rows=state.projects.map((p,i)=>`<div class="trow"><div><b>${esc(p.name)}</b><div class="projectSub">${esc(p.client)} · ${esc(p.member)}</div></div><div>${esc(p.status)}</div><div>${p.progress}%</div><div class="money">${money(p.value)}</div><div class="actions"><button class="btn primary" data-edit-project="${i}">Edit</button></div></div>`).join('');$('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · PROJECTS</div><div class="title">Projects</div><div class="subtitle">All project data is locally saved immediately and synced to Supabase when connected.</div></div><button class="btn primary" data-add-project>＋ New Project</button></div><section class="panel"><div class="panelHead"><h3>Project Register</h3><span class="metaChip">${state.projects.length} records</span></div><div class="panelBody"><div class="tableLike"><div class="trow thead2"><div>Project</div><div>Status</div><div>Progress</div><div>Value</div><div>Actions</div></div>${rows||'<div class="mutedBox">No projects.</div>'}</div></div></section>`}
  function editProject(i){const p=state.projects[i];if(!p)return;openModal('Edit Project',`<div class="modalGrid"><div class="field"><label>Project Name</label><input class="input" id="epName" value="${esc(p.name)}"></div><div class="field"><label>Client</label><input class="input" id="epClient" value="${esc(p.client)}"></div><div class="field"><label>Progress %</label><input class="input" id="epProgress" type="number" min="0" max="100" value="${p.progress}"></div><div class="field"><label>Status</label><select class="select" id="epStatus"><option ${p.status==='Planning'?'selected':''}>Planning</option><option ${p.status==='In Progress'?'selected':''}>In Progress</option><option ${p.status==='Pending'?'selected':''}>Pending</option><option ${p.status==='Completed'?'selected':''}>Completed</option></select></div><div class="field"><label>Due</label><input class="input" id="epDue" type="date" value="${p.due}"></div><div class="field"><label>Value</label><input class="input" id="epValue" type="number" value="${p.value}"></div><div class="field" style="grid-column:1/-1"><label>Member</label><select class="select" id="epMember">${state.team.members.map(m=>`<option ${m.name===p.member?'selected':''}>${esc(m.name)}</option>`).join('')}</select></div></div>`,()=>{p.name=$('#epName').value.trim()||p.name;p.client=$('#epClient').value.trim();p.progress=Math.max(0,Math.min(100,Number($('#epProgress').value||0)));p.status=$('#epStatus').value;p.due=$('#epDue').value;p.value=Math.max(0,Number($('#epValue').value||0));p.member=$('#epMember').value;persist();closeModal();renderProjects();notify('Project updated and saved')});}
  function addProject(){openModal('New Project',`<div class="modalGrid"><div class="field"><label>Project Name</label><input class="input" id="npName"></div><div class="field"><label>Client</label><input class="input" id="npClient"></div><div class="field"><label>Due</label><input class="input" id="npDue" type="date" value="${today()}"></div><div class="field"><label>Value</label><input class="input" id="npValue" type="number" value="0"></div><div class="field"><label>Member</label><select class="select" id="npMember">${state.team.members.map(m=>`<option>${esc(m.name)}</option>`).join('')}</select></div></div>`,()=>{const name=$('#npName').value.trim();if(!name)throw new Error('Enter project name');state.projects.unshift({id:uid('p'),name,client:$('#npClient').value.trim(),progress:0,status:'Planning',due:$('#npDue').value,value:Number($('#npValue').value||0),member:$('#npMember').value});persist();closeModal();renderProjects();notify('Project created and saved')});}

  /* ----------------------------- CALENDAR ------------------------------ */
  function renderCalendar(){const events=state.calendar.map((e,i)=>`<div class="event"><div style="display:flex;justify-content:space-between;gap:8px"><div><b>${esc(e.title)}</b><small>${esc(e.date)} · ${esc(e.time||'Any time')} · ${esc(e.type||'Event')}</small></div><div class="actions"><button class="btn primary" data-edit-event="${i}">Edit</button><button class="btn danger" data-delete-event="${i}">Delete</button></div></div></div>`).join('');$('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · CALENDAR</div><div class="title">Calendar</div><div class="subtitle">Meetings, deadlines and team events.</div></div><button class="btn primary" data-add-event>＋ Add Event</button></div><section class="panel"><div class="panelHead"><h3>Upcoming Events</h3></div><div class="panelBody events">${events||'<div class="mutedBox">No events yet.</div>'}</div></section>`}
  function addEvent(i=null){const e=i===null?{title:'',date:today(),time:'',type:'Custom'}:state.calendar[i];openModal(i===null?'Add Event':'Edit Event',`<div class="modalGrid"><div class="field"><label>Title</label><input class="input" id="evTitle" value="${esc(e.title)}"></div><div class="field"><label>Date</label><input class="input" id="evDate" type="date" value="${e.date}"></div><div class="field"><label>Time</label><input class="input" id="evTime" type="time" value="${e.time||''}"></div><div class="field"><label>Type</label><select class="select" id="evType"><option ${e.type==='Meeting'?'selected':''}>Meeting</option><option ${e.type==='Deadline'?'selected':''}>Deadline</option><option ${e.type==='Payment'?'selected':''}>Payment</option><option ${e.type==='Custom'?'selected':''}>Custom</option></select></div></div>`,()=>{const obj={id:e.id||uid('e'),title:$('#evTitle').value.trim(),date:$('#evDate').value,time:$('#evTime').value,type:$('#evType').value};if(!obj.title)throw new Error('Enter event title');if(i===null)state.calendar.push(obj);else state.calendar[i]=obj;persist();closeModal();renderCalendar();notify('Calendar saved')});}

  /* ------------------------------ REPORTS ------------------------------ */
  function renderReports(){const total=state.projects.reduce((a,p)=>a+Number(p.value||0),0),done=state.projects.filter(p=>p.status==='Completed').length,received=state.finance.transactions.filter(x=>x.kind==='income').reduce((a,x)=>a+Number(x.amount||0),0);$('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · REPORTS</div><div class="title">Reports & Analytics</div><div class="subtitle">Shared operational and financial summaries.</div></div><button class="btn primary" id="reportPrint">Print Report</button></div><section class="kpis"><div class="kpi"><span class="kpiLabel">Project Value</span><b>${money(total)}</b><span class="trend">${state.projects.length} projects</span></div><div class="kpi"><span class="kpiLabel">Completed</span><b>${done}</b><span class="trend">${state.projects.length?Math.round(done/state.projects.length*100):0}%</span></div><div class="kpi"><span class="kpiLabel">Income</span><b>${money(received)}</b><span class="trend">Accounts</span></div><div class="kpi"><span class="kpiLabel">Members</span><b>${state.team.members.length}</b><span class="trend">SRS VISION</span></div></section><div class="bottomGrid"><section class="panel"><div class="panelHead"><h3>Project Distribution</h3></div><div class="panelBody"><div class="donutBox"><div class="donut"><div class="donutLabel"><div><b>${state.projects.length}</b><small>Projects</small></div></div></div></div></div></section><section class="panel"><div class="panelHead"><h3>Revenue Overview</h3></div><div class="panelBody"><div class="chartWrap"><div class="chartBars">${[42,55,68,58,76,92].map((v,i)=>`<div class="chartBar"><i style="height:${v}%"></i><span>${['Apr','May','Jun','Jul','Aug','Sep'][i]}</span></div>`).join('')}</div></div></div></section></div>`;$('#reportPrint').onclick=()=>printHtml('SRS Vision Report',`Projects: ${state.projects.length}\nCompleted: ${done}\nProject Value: ${money(total)}\nIncome: ${money(received)}\nTeam Members: ${state.team.members.length}`)}

  /* ------------------------------ CLIENTS ----------------------------- */
  function renderClients(){const rows=state.clients.map((c,i)=>`<div class="trow"><div><b>${esc(c.name)}</b><div class="projectSub">${esc(c.service)}</div></div><div>${esc(c.status)}</div><div>${esc(c.phone||'')}</div><div>Client</div><div class="actions"><button class="btn primary" data-edit-client="${i}">Edit</button></div></div>`).join('');$('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · CLIENTS</div><div class="title">Clients</div><div class="subtitle">Client records and service context.</div></div><button class="btn primary" data-add-client>＋ Add Client</button></div><section class="panel"><div class="panelBody"><div class="tableLike"><div class="trow thead2"><div>Client</div><div>Status</div><div>Contact</div><div>Type</div><div>Actions</div></div>${rows||'<div class="mutedBox">No clients.</div>'}</div></div></section>`}
  function editClient(i){const c=state.clients[i];openModal(i<0?'Add Client':'Edit Client',`<div class="modalGrid"><div class="field"><label>Name</label><input class="input" id="cName" value="${esc(c?.name||'')}"></div><div class="field"><label>Service</label><input class="input" id="cService" value="${esc(c?.service||'')}"></div><div class="field"><label>Status</label><select class="select" id="cStatus"><option>Active</option><option>Lead</option><option>Paused</option><option>Completed</option></select></div><div class="field"><label>Phone</label><input class="input" id="cPhone" value="${esc(c?.phone||'')}"></div></div>`,()=>{const obj=c||{id:uid('c')};obj.name=$('#cName').value.trim();obj.service=$('#cService').value.trim();obj.status=$('#cStatus').value;obj.phone=$('#cPhone').value.trim();if(!obj.name)throw new Error('Enter client name');if(i<0)state.clients.push(obj);else state.clients[i]=obj;persist();closeModal();renderClients();notify('Client saved')});setTimeout(()=>{if(c)$('#cStatus').value=c.status},0)}

  /* ------------------------------ ACCOUNT ------------------------------ */
  function renderAccount(){const a=state.account;const uidText=Live.session?.user?.id||'Not connected';$('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · ACCOUNT</div><div class="title">Account</div><div class="subtitle">Your SRS Vision workspace profile and connection identity.</div></div><button class="btn primary" id="accountSave">Save Account</button></div><section class="workspace"><div class="modalGrid"><div class="field"><label>Display Name</label><input class="input" id="acName" value="${esc(a.name)}"></div><div class="field"><label>Email</label><input class="input" id="acEmail" type="email" value="${esc(a.email)}"></div><div class="field"><label>Phone</label><input class="input" id="acPhone" value="${esc(a.phone)}"></div><div class="field"><label>Role</label><input class="input" id="acRole" value="${esc(a.role)}"></div></div><div class="membersMeta"><span class="metaChip">Authentication: ${Live.status==='online'?'Anonymous session connected':'Local mode'}</span><span class="metaChip">Session: ${esc(uidText.slice(0,18))}</span></div></section><section class="panel" style="margin-top:14px"><div class="panelHead"><h3>Account Actions</h3></div><div class="panelBody"><div class="heroActions"><button class="btn cyan" id="accountSync">Sync Now</button><button class="btn" id="accountExport">Export My Data</button><button class="btn" id="accountNotifications">Request Browser Notifications</button></div></div></section>`;$('#accountSave').onclick=()=>{a.name=$('#acName').value.trim();a.email=$('#acEmail').value.trim();a.phone=$('#acPhone').value.trim();a.role=$('#acRole').value.trim();persist();notify('Account saved globally when Supabase is connected')};$('#accountSync').onclick=async()=>{await Live.writeNow(true);renderAccount()};$('#accountExport').onclick=()=>downloadBlob(JSON.stringify(state,null,2),'application/json','srs-vision-account-backup.json');$('#accountNotifications').onclick=async()=>{if(!('Notification'in window))return notify('Browser notifications are not supported');const p=await Notification.requestPermission();notify(`Notification permission: ${p}`)} }

  /* ----------------------------- ACCOUNTS ------------------------------ */
  function renderAccounts(){const income=state.finance.transactions.filter(x=>x.kind==='income').reduce((a,x)=>a+Number(x.amount||0),0),expense=state.finance.transactions.filter(x=>x.kind==='expense').reduce((a,x)=>a+Number(x.amount||0),0),net=income-expense;const tx=state.finance.transactions.slice().reverse().map(x=>`<div class="event"><b>${esc(x.kind.toUpperCase())} · ${money(x.amount)}</b><small>${esc(x.note||'')} · ${esc(x.date||today())}</small></div>`).join('');$('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · ACCOUNTS</div><div class="title">Accounts & Ledger</div><div class="subtitle">Track internal income, expenses and account balances.</div></div><button class="btn primary" data-add-transaction>＋ Add Transaction</button></div><section class="kpis"><div class="kpi"><span class="kpiLabel">Income</span><b>${money(income)}</b><span class="trend">Recorded</span></div><div class="kpi"><span class="kpiLabel">Expenses</span><b>${money(expense)}</b><span class="trend">Recorded</span></div><div class="kpi"><span class="kpiLabel">Net</span><b>${money(net)}</b><span class="trend">Internal ledger</span></div><div class="kpi"><span class="kpiLabel">Bank Accounts</span><b>${state.finance.bankAccounts.length}</b><span class="trend">Open</span></div></section><section class="panel"><div class="panelHead"><h3>Ledger</h3><button class="btn ghost" data-nav="banking">Banking →</button></div><div class="panelBody events">${tx||'<div class="mutedBox">No transactions yet.</div>'}</div></section>`}
  function addTransaction(){openModal('Add Ledger Transaction',`<div class="modalGrid"><div class="field"><label>Type</label><select class="select" id="trKind"><option value="income">Income</option><option value="expense">Expense</option></select></div><div class="field"><label>Amount (₹)</label><input class="input" id="trAmt" type="number" min="0"></div><div class="field" style="grid-column:1/-1"><label>Note</label><input class="input" id="trNote"></div></div>`,()=>{const amount=Number($('#trAmt').value||0);if(!amount)throw new Error('Enter amount');state.finance.transactions.push({id:uid('t'),kind:$('#trKind').value,amount,note:$('#trNote').value.trim(),date:today()});persist();closeModal();renderAccounts();notify('Transaction saved')})}

  /* ----------------------------- BANKING ------------------------------- */
  function renderBanking(){const accounts=state.finance.bankAccounts.map((b,i)=>`<article class="member"><div class="memberHead"><div class="memberAvatar">🏦</div><div><h4>${esc(b.bank)}</h4><small>${esc(b.type)} · •••• ${esc(b.last4)}</small></div></div><div class="title" style="font-size:24px;margin-top:12px">${money(b.balance)}</div><div class="projectSub">${esc(b.holder)}</div><div class="memberActions"><button class="btn primary" data-bank-deposit="${i}">＋ Deposit</button><button class="btn" data-bank-withdraw="${i}">− Withdraw</button><button class="btn" data-bank-edit="${i}">Edit</button></div></article>`).join('');$('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · BANKING</div><div class="title">Banking</div><div class="subtitle">Internal banking dashboard and transparent transfer approvals.</div></div><div class="heroActions"><button class="btn primary" data-add-bank>＋ Add Account</button><button class="btn cyan" data-nav="money-transfer">Transfer Approval →</button></div></div><section class="panel"><div class="panelBody"><div class="memberGrid">${accounts||'<div class="mutedBox">No bank accounts yet.</div>'}</div></div></section><section class="panel" style="margin-top:14px"><div class="panelHead"><h3>Banking Rules</h3><span class="metaChip">${state.team.members.length} approvers</span></div><div class="panelBody"><div class="mutedBox">This website records an internal approval workflow; it does not directly submit payments to a bank. External bank authentication, OTP and payment authorization remain with the bank/payment provider.</div></div></section>`}
  function addBank(i=null){const b=i===null?{bank:'',holder:'SRS VISION',type:'Current',last4:'',balance:0}:state.finance.bankAccounts[i];openModal(i===null?'Add Bank Account':'Edit Bank Account',`<div class="modalGrid"><div class="field"><label>Bank</label><input class="input" id="bkBank" value="${esc(b.bank)}"></div><div class="field"><label>Holder</label><input class="input" id="bkHolder" value="${esc(b.holder)}"></div><div class="field"><label>Type</label><select class="select" id="bkType"><option>Current</option><option>Savings</option></select></div><div class="field"><label>Last 4 digits</label><input class="input" id="bkLast" value="${esc(b.last4)}"></div><div class="field"><label>Opening Balance (₹)</label><input class="input" id="bkBal" type="number" value="${b.balance}"></div></div>`,()=>{const obj={...b,id:b.id||uid('b'),bank:$('#bkBank').value.trim(),holder:$('#bkHolder').value.trim(),type:$('#bkType').value,last4:$('#bkLast').value.trim(),balance:Number($('#bkBal').value||0)};if(!obj.bank)throw new Error('Enter bank name');if(i===null)state.finance.bankAccounts.push(obj);else state.finance.bankAccounts[i]=obj;persist();closeModal();renderBanking();notify('Bank account saved')});setTimeout(()=>{if(b)$('#bkType').value=b.type},0)}
  function bankAction(i,kind){const b=state.finance.bankAccounts[i];openModal(`${kind==='deposit'?'Deposit':'Withdraw'} · ${b.bank}`,`<div class="field"><label>Amount (₹)</label><input class="input" id="bankAmt" type="number" min="0"></div><div class="field"><label>Note</label><input class="input" id="bankNote"></div>`,()=>{const a=Number($('#bankAmt').value||0);if(!a)throw new Error('Enter amount');if(kind==='withdraw'&&a>b.balance)throw new Error('Insufficient internal balance');b.balance+=kind==='deposit'?a:-a;state.finance.transactions.push({id:uid('t'),kind:kind==='deposit'?'income':'expense',amount:a,note:$('#bankNote').value.trim()||`${kind} · ${b.bank}`,date:today()});persist();closeModal();renderBanking();notify(`${kind} saved`)})}

  /* -------------------------- MONEY APPROVAL --------------------------- */
  function renderMoney(){
    const current=state.finance.transfers[0];
    const approvals=current?.approvals||MEMBERS.map(name=>({member:name,decision:'Pending'}));
    const counts={allow:approvals.filter(x=>x.decision==='Allow').length,deny:approvals.filter(x=>x.decision==='Deny').length,pending:approvals.filter(x=>x.decision==='Pending').length};
    const approverRows=approvals.map((a,i)=>`<div class="trow"><div><b>${esc(a.member)}</b></div><div><span class="pill ${a.decision==='Allow'?'done':a.decision==='Deny'?'pending':''}">${a.decision}</span></div><div>${current?esc(a.respondedAt||'Not yet'):''}</div><div class="actions">${current?`<button class="btn green" data-allow="${i}">Allow</button><button class="btn danger" data-deny="${i}">Deny</button>`:''}</div></div>`).join('');
    $('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · TRUST WORKFLOW</div><div class="title">Money Transfer Approval</div><div class="subtitle">Transparent ${MEMBERS.length}-member approval: one Deny blocks the request; all ${MEMBERS.length} Allow unlocks internal execution.</div></div></div><section class="workspace"><div class="modalGrid"><div class="field"><label>Requesting Member</label><select class="select" id="txMember">${MEMBERS.map(x=>`<option>${esc(x)}</option>`).join('')}</select></div><div class="field"><label>Recipient Number / UPI / Account Reference</label><input class="input" id="txRecipient" placeholder="Enter recipient reference"></div><div class="field"><label>Amount (₹)</label><input class="input" id="txAmount" type="number" min="0"></div><div class="field"><label>Purpose</label><input class="input" id="txPurpose" placeholder="Business purpose"></div></div><div class="heroActions"><button class="btn primary" id="txCreate">Create Transfer Request</button></div></section>${current?`<section class="panel" style="margin-top:14px"><div class="panelHead"><h3>Current Request</h3><div class="membersMeta"><span class="metaChip">Allow ${counts.allow}/${MEMBERS.length}</span><span class="metaChip">Deny ${counts.deny}</span><span class="metaChip">Pending ${counts.pending}</span></div></div><div class="panelBody"><div class="tableLike"><div class="trow thead2"><div>Member</div><div>Decision</div><div>Response</div><div>Action</div></div>${approverRows}</div><div class="heroActions"><button class="btn ${counts.deny>0?'danger':counts.pending>0?'':'green'}" id="txExecute">${counts.deny>0?'⛔ Transfer Blocked':counts.pending>0?`⏳ Waiting for ${counts.pending} member(s)`:`✅ All ${MEMBERS.length} Allowed — Record Internal Transfer`}</button></div></div></section>`:'<div class="mutedBox" style="margin-top:14px">No transfer request yet.</div>'}`;
    $('#txCreate').onclick=()=>{const amount=Number($('#txAmount').value||0);if(!amount)return notify('Enter transfer amount');const req={id:uid('x'),requester:$('#txMember').value,recipient:$('#txRecipient').value.trim(),amount,purpose:$('#txPurpose').value.trim(),createdAt:new Date().toLocaleString('en-IN'),status:'Pending Approval',approvals:MEMBERS.map(name=>({member:name,decision:'Pending',respondedAt:''}))};state.finance.transfers.unshift(req);persist();notify('Transfer request created for all members');renderMoney()};
    $$('[data-allow]').forEach(b=>b.onclick=()=>setApproval(Number(b.dataset.allow),'Allow'));
    $$('[data-deny]').forEach(b=>b.onclick=()=>setApproval(Number(b.dataset.deny),'Deny'));
    $('#txExecute')?.addEventListener('click',()=>{if(!current)return;const all=current.approvals.every(a=>a.decision==='Allow');if(!all){notify(current.approvals.some(a=>a.decision==='Deny')?'Transfer blocked by a Deny':'Waiting for every member to Allow');return}if(current.status==='Executed'){notify('Transfer already recorded');return}current.status='Executed';state.finance.transactions.push({id:uid('t'),kind:'expense',amount:Number(current.amount||0),note:`Approved internal transfer to ${current.recipient}`,date:today()});persist();renderMoney();notify('All approvals present — internal transfer recorded')});
  }
  function setApproval(i,decision){const current=state.finance.transfers[0];if(!current?.approvals[i])return;current.approvals[i].decision=decision;current.approvals[i].respondedAt=new Date().toLocaleString('en-IN');current.status=current.approvals.some(a=>a.decision==='Deny')?'Blocked':current.approvals.every(a=>a.decision==='Allow')?'Approved':'Pending Approval';persist();renderMoney();}

  /* ----------------------------- NOTICES -------------------------------- */
  function renderNotifications(){const rows=state.social.notifications.slice(0,30).map(n=>`<div class="notifRow"><span class="notifIcon">${esc(n.icon||'🔔')}</span><div><b>${esc(n.title)}</b><small>${esc(n.platform)} · ${esc(n.body)}</small></div><small>${esc(n.time||'')}</small></div>`).join('');$('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · NOTIFICATIONS</div><div class="title">Notification Center</div><div class="subtitle">One inbox for social, project, team and system events.</div></div><div class="heroActions"><button class="btn primary" id="testNotif">Test Notification</button><button class="btn" id="browserNotif">Browser Notifications</button></div></div><section class="panel"><div class="panelHead"><h3>Inbox</h3><span class="metaChip">${state.social.notifications.length} notifications</span></div><div class="panelBody">${rows||'<div class="mutedBox">No notifications.</div>'}</div></section><section class="workspace" style="margin-top:14px"><div class="mutedBox">Automatic private notifications from WhatsApp, Instagram, YouTube, Pinterest and other platforms require the platform's official OAuth/API/webhook connection; the SRS Vision inbox is ready to receive those events once each connector is authorised.</div></section>`;$('#testNotif').onclick=()=>{state.social.notifications.unshift({icon:'🔔',platform:'SRS Vision',title:'Test notification',body:'The notification center is working.',time:'Just now'});persist();renderNotifications();notify('Notification created')};$('#browserNotif').onclick=async()=>{if(!('Notification'in window))return notify('Not supported');const p=await Notification.requestPermission();if(p==='granted')new Notification('SRS Vision',{body:'Browser notifications are enabled.'});notify(`Permission: ${p}`)}}

  /* ------------------------------ FILES -------------------------------- */
  function renderFiles(){const rows=state.files.map((f,i)=>`<div class="event"><div style="display:flex;justify-content:space-between;gap:8px"><div><b>${esc(f.name)}</b><small>${esc(f.type||'file')} · ${esc(f.date||today())}</small></div><button class="btn danger" data-file-delete="${i}">Delete</button></div></div>`).join('');$('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · FILES</div><div class="title">Files</div><div class="subtitle">File register and browser uploads; metadata syncs to Supabase.</div></div><label class="btn primary">＋ Upload<input id="fileUpload" type="file" hidden></label></div><section class="panel"><div class="panelBody events">${rows||'<div class="mutedBox">No files yet.</div>'}</div></section>`;$('#fileUpload').onchange=e=>{const f=e.target.files?.[0];if(!f)return;state.files.unshift({id:uid('f'),name:f.name,type:f.type,size:f.size,date:today()});persist();renderFiles();notify('File metadata saved')};$$('[data-file-delete]').forEach(b=>b.onclick=()=>{state.files.splice(Number(b.dataset.fileDelete),1);persist();renderFiles();notify('File removed')})}

  /* --------------------------- APP MANAGER ----------------------------- */
  function renderAppManager(){const groups=CATEGORIES.map(([id,icon,title,desc])=>{const built=APPS[id]||[];const custom=state.customApps[id]||[];return `<section class="panel"><div class="panelHead"><div><h3>${icon} ${esc(title)}</h3><span class="subtitle">${esc(desc)} · dedicated dashboard</span></div><button class="btn primary" data-add-app="${id}">＋ Add App</button></div><div class="panelBody"><div class="workspaceCards">${built.map(a=>appCard(a[0],a[1],a[2],false)).join('')}${custom.map((a,i)=>appCard(a.name,a.description,a.url,true,id,i)).join('')}${!built.length&&!custom.length?'<div class="mutedBox">No apps yet. Add one manually.</div>':''}</div></div></section>`}).join('');$('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · APP MANAGER</div><div class="title">All Tools & App Slots</div><div class="subtitle">Every category has its own dashboard; use Add App to create your own launcher slots.</div></div><button class="btn ghost" data-nav="dashboard">← Main Dashboard</button></div><div class="membersMeta"><span class="metaChip">${CATEGORIES.reduce((n,[id])=>n+(APPS[id]?.length||0)+(state.customApps[id]?.length||0),0)} App Slots</span><span class="metaChip">${CATEGORIES.length} Dedicated Dashboards</span><span class="metaChip">Manual Add Supported</span></div><div class="stack">${groups}</div>`;}
  function appCard(name,desc,url,isCustom=false,cat='',idx=0){return `<article class="appCard"><div class="appGlyph">${initials(name).slice(0,2)}</div><div class="appInfo"><b>${esc(name)}</b><small>${esc(desc||'Open app')}</small></div><div class="appActions"><a class="btn primary" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Open ↗</a>${isCustom?`<button class="btn" data-edit-app="${cat}:${idx}">Edit</button><button class="btn danger" data-delete-app="${cat}:${idx}">×</button>`:''}</div></article>`}
  function addApp(category,i=null){const old=i===null?{name:'',url:'',description:''}:state.customApps[category][i];openModal(i===null?'Add Custom App':'Edit Custom App',`<div class="modalGrid"><div class="field"><label>App Name</label><input class="input" id="appName" value="${esc(old.name)}" placeholder="Example App"></div><div class="field"><label>URL</label><input class="input" id="appUrl" value="${esc(old.url)}" placeholder="https://example.com"></div><div class="field" style="grid-column:1/-1"><label>Description</label><input class="input" id="appDesc" value="${esc(old.description)}" placeholder="What this app is for"></div></div><div class="mutedBox" style="margin-top:10px">Use an official https:// URL, or a custom app protocol where your operating system/browser permits it. External apps keep their own sign-in and permissions.</div>`,()=>{const obj={name:$('#appName').value.trim(),url:$('#appUrl').value.trim(),description:$('#appDesc').value.trim()};if(!obj.name||!obj.url)throw new Error('Enter app name and URL');if(i===null)state.customApps[category].push(obj);else state.customApps[category][i]=obj;persist();closeModal();renderAppManager();notify('App slot saved')});}

  /* -------------------------- TOOL WORKSPACES ------------------------- */
  function toolHeader(key,extra=''){const v=TOOL_META[key];return `<div class="pageHead"><div><div class="eyebrow">SRS VISION · DEDICATED DASHBOARD</div><div class="title">${v.icon} ${esc(v.title)}</div><div class="subtitle">${esc(v.desc)}</div></div><div class="heroActions"><button class="btn ghost" data-nav="dashboard">← Main Dashboard</button><button class="btn ghost" id="toolBack">← Back</button>${extra}</div></div>`}
  function renderTool(key){
    if(key==='graphic-design')return renderGraphicDesign();
    if(key==='ai-tools')return renderAI();
    if(key==='social-media')return renderSocial();
    if(key==='video-tools')return renderVideoTools();
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
    return renderMain();
  }
  function appSlotSection(key){const built=APPS[key]||[], custom=state.customApps[key]||[];return `<section class="panel" style="margin-top:14px"><div class="panelHead"><h3>App Slots</h3><button class="btn primary" data-add-app="${key}">＋ Add App</button></div><div class="panelBody"><div class="workspaceCards">${built.map(a=>appCard(a[0],a[1],a[2])).join('')}${custom.map((a,i)=>appCard(a.name,a.description,a.url,true,key,i)).join('')}</div></div></section>`}
  function renderGraphicDesign(){$('#content').innerHTML=toolHeader('graphic-design','<button class="btn primary" id="gdExport">Export PNG</button>')+`<section class="workspace"><div class="wsGrid"><div><div class="field"><label>Design Title</label><input class="input" id="gdTitle" value="Your Vision"></div><div class="field" style="margin-top:10px"><label>Subtitle</label><input class="input" id="gdSubtitle" value="Our Creation"></div><div class="field" style="margin-top:10px"><label>Background</label><input class="input" id="gdBg" type="color" value="#143d7a"></div><div class="field" style="margin-top:10px"><label>Text Color</label><input class="input" id="gdColor" type="color" value="#ffffff"></div><div class="field" style="margin-top:10px"><label>Message</label><textarea class="textarea" id="gdMessage">Create designs, posters, social creatives and brand stories from SRS Vision.</textarea></div><div class="heroActions"><button class="btn primary" id="gdApply">Update Preview</button><button class="btn" id="gdSave">Save Draft</button></div></div><div class="editorCanvas"><div class="canvasInner" id="gdCanvas"><div><h2 id="gdCanvasTitle">Your Vision</h2><p id="gdCanvasSubtitle">Our Creation</p><p id="gdCanvasMessage">Create designs, posters, social creatives and brand stories from SRS Vision.</p></div></div></div></div></section>${appSlotSection('graphic-design')}`;const apply=()=>{$('#gdCanvasTitle').textContent=$('#gdTitle').value||'Your Vision';$('#gdCanvasSubtitle').textContent=$('#gdSubtitle').value||'Our Creation';$('#gdCanvasMessage').textContent=$('#gdMessage').value||'';$('#gdCanvas').style.background=$('#gdBg').value;$('#gdCanvas').style.color=$('#gdColor').value};$('#gdApply').onclick=apply;$('#gdSave').onclick=()=>{state.notes.unshift({id:uid('n'),title:$('#gdTitle').value||'Design Draft',body:$('#gdMessage').value||'',date:today()});persist();notify('Design draft saved')};$('#gdExport').onclick=()=>{apply();const c=document.createElement('canvas');c.width=1200;c.height=750;const ctx=c.getContext('2d');ctx.fillStyle=$('#gdBg').value;ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle=$('#gdColor').value;ctx.textAlign='center';ctx.font='900 70px Segoe UI';ctx.fillText($('#gdTitle').value||'Your Vision',600,280);ctx.font='600 34px Segoe UI';ctx.fillText($('#gdSubtitle').value||'Our Creation',600,350);ctx.font='400 24px Segoe UI';ctx.fillText($('#gdMessage').value.slice(0,80),600,430);downloadData(c.toDataURL('image/png'),'srs-vision-design.png')}}
  function renderAI(){const history=state.ai.history.slice(0,8).map(x=>`<div class="event"><b>${esc(x.model)}</b><small>${esc(x.prompt)} · ${esc(x.date)}</small></div>`).join('')||'<div class="mutedBox">No prompts yet.</div>';const apps=APPS['ai-tools']||[];$('#content').innerHTML=toolHeader('ai-tools')+`<section class="workspace"><div class="wsGrid"><div><div class="field"><label>AI platform</label><select class="select" id="aiModel">${apps.map(x=>`<option>${esc(x[0])}</option>`).join('')}</select></div><div class="field" style="margin-top:10px"><label>Prompt</label><textarea class="textarea" id="aiPrompt" placeholder="Write your prompt here…"></textarea></div><div class="heroActions"><button class="btn primary" id="aiLaunch">Open AI</button><button class="btn" id="aiSave">Save Prompt</button></div></div><div><div class="eyebrow">Saved Prompt History</div><div class="events" style="margin-top:10px">${history}</div></div></div></section>${appSlotSection('ai-tools')}`;$('#aiLaunch').onclick=()=>{const name=$('#aiModel').value;const p=$('#aiPrompt').value.trim();if(p){state.ai.history.unshift({model:name,prompt:p,date:today()});persist()}const u=apps.find(x=>x[0]===name)?.[2];window.open(u,'_blank','noopener,noreferrer')};$('#aiSave').onclick=()=>{const p=$('#aiPrompt').value.trim();if(!p)return notify('Write a prompt first');state.ai.history.unshift({model:$('#aiModel').value,prompt:p,date:today()});persist();notify('Prompt saved')}}
  function renderSocial(){const apps=APPS['social-media']||[];const connectedCount=Object.values(state.social.connected||{}).filter(Boolean).length;const notes=state.social.notifications.slice(0,10).map(n=>`<div class="notifRow"><span class="notifIcon">🔔</span><div><b>${esc(n.title)}</b><small>${esc(n.platform)} · ${esc(n.body)}</small></div><small>${esc(n.time||'')}</small></div>`).join('')||'<div class="mutedBox">No notifications yet.</div>';$('#content').innerHTML=toolHeader('social-media',`<button class="btn primary" id="socialTest">Test Alert</button>`)+`<section class="panel"><div class="panelHead"><h3>Platform Slots</h3><span class="metaChip">${apps.length+ (state.customApps['social-media']||[]).length} slots · ${connectedCount} marked connected</span></div><div class="panelBody"><div class="workspaceCards">${apps.map((a,i)=>`<article class="appCard"><div class="appGlyph">${initials(a[0]).slice(0,2)}</div><div class="appInfo"><b>${esc(a[0])}</b><small>${esc(a[1])}</small></div><div class="appActions"><button class="btn" data-social-connect="${i}">${state.social.connected[a[0]]?'Connected':'Connect'}</button><a class="btn primary" href="${esc(a[2])}" target="_blank" rel="noopener noreferrer">Open ↗</a></div></article>`).join('')}</div></div></section><section class="panel" style="margin-top:14px"><div class="panelHead"><h3>Website Notifications</h3><button class="btn" data-nav="notifications">Open Inbox →</button></div><div class="panelBody">${notes}<div class="mutedBox" style="margin-top:10px">Automatic private platform events require official OAuth/API/webhook authorization; SRS Vision provides the shared notification inbox and connector-ready slots.</div></div></section>${appSlotSection('social-media')}`;$('#socialTest').onclick=()=>{state.social.notifications.unshift({platform:'SRS Vision',title:'Social test alert',body:'Notification center received a new test event.',time:'Just now'});persist();renderSocial();notify('Alert added')};$$('[data-social-connect]').forEach(b=>b.onclick=()=>{const name=apps[Number(b.dataset.socialConnect)][0];state.social.connected[name]=!state.social.connected[name];persist();renderSocial();notify(`${name} ${state.social.connected[name]?'marked connected':'disconnected'}`)})}
  function renderVideoTools(){$('#content').innerHTML=toolHeader('video-tools')+`<section class="workspace"><div class="wsGrid"><div><div class="field"><label>Video file</label><input class="input" id="videoFile" type="file" accept="video/*"></div><div class="field" style="margin-top:10px"><label>Playback speed</label><select class="select" id="videoSpeed"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></div><div class="field" style="margin-top:10px"><label>Review notes</label><textarea class="textarea" id="videoNotes"></textarea></div><button class="btn primary" id="videoSave">Save Review</button></div><div class="editorCanvas"><video id="videoPreview" controls style="max-width:100%;max-height:360px;border-radius:12px;background:#000"></video></div></div></section>${appSlotSection('video-tools')}`;const v=$('#videoPreview');$('#videoFile').onchange=e=>{const f=e.target.files?.[0];if(!f)return;v.src=URL.createObjectURL(f)};$('#videoSpeed').onchange=e=>v.playbackRate=Number(e.target.value);$('#videoSave').onclick=()=>{const t=$('#videoNotes').value.trim();if(!t)return notify('Write review notes');state.notes.unshift({id:uid('n'),title:'Video Review',body:t,date:today()});persist();notify('Video review saved')}}
  function renderImageTools(){$('#content').innerHTML=toolHeader('image-tools','<button class="btn primary" id="imgDownload">Download Image</button>')+`<section class="workspace"><div class="wsGrid"><div><div class="field"><label>Choose image</label><input class="input" id="imgFile" type="file" accept="image/*"></div><div class="field" style="margin-top:10px"><label>Brightness</label><input id="imgBright" class="range" type="range" min="50" max="150" value="100"></div><div class="field" style="margin-top:10px"><label>Contrast</label><input id="imgContrast" class="range" type="range" min="50" max="150" value="100"></div><div class="field" style="margin-top:10px"><label>Grayscale</label><input id="imgGray" class="range" type="range" min="0" max="100" value="0"></div><div class="heroActions"><button class="btn" id="imgRotate">Rotate 90°</button><button class="btn" id="imgReset">Reset</button></div></div><div class="editorCanvas"><canvas id="imgCanvas" width="800" height="500" style="max-width:100%;border-radius:12px;background:#061529"></canvas></div></div></section>${appSlotSection('image-tools')}`;const c=$('#imgCanvas'),ctx=c.getContext('2d');let img=null,rotation=0;const draw=()=>{ctx.clearRect(0,0,c.width,c.height);if(!img){ctx.fillStyle='#8aa1ba';ctx.font='18px Segoe UI';ctx.textAlign='center';ctx.fillText('Choose an image to start',400,250);return}const b=Number($('#imgBright').value),co=Number($('#imgContrast').value),g=Number($('#imgGray').value);ctx.save();ctx.translate(c.width/2,c.height/2);ctx.rotate(rotation*Math.PI/180);const scale=Math.min((c.width-30)/img.width,(c.height-30)/img.height);ctx.filter=`brightness(${b}%) contrast(${co}%) grayscale(${g}%)`;ctx.drawImage(img,-img.width*scale/2,-img.height*scale/2,img.width*scale,img.height*scale);ctx.restore()};$('#imgFile').onchange=e=>{const f=e.target.files?.[0];if(!f)return;const im=new Image();im.onload=()=>{img=im;draw()};im.src=URL.createObjectURL(f)};['imgBright','imgContrast','imgGray'].forEach(id=>$('#'+id).oninput=draw);$('#imgRotate').onclick=()=>{rotation=(rotation+90)%360;draw()};$('#imgReset').onclick=()=>{rotation=0;$('#imgBright').value=100;$('#imgContrast').value=100;$('#imgGray').value=0;draw()};$('#imgDownload').onclick=()=>{if(!img)return notify('Choose an image first');downloadData(c.toDataURL('image/png'),'srs-vision-edited-image.png')}}
  function renderDocumentTools(){$('#content').innerHTML=toolHeader('document-tools','<button class="btn primary" id="docExport">Export TXT</button>')+`<section class="workspace"><div class="field"><label>Title</label><input class="input" id="docTitle" value="${esc(state.account.name||'SRS Vision Document')}"></div><div class="field" style="margin-top:10px"><label>Body</label><textarea class="textarea" id="docBody" style="min-height:330px">${esc(state.notes[0]?.body||'')}</textarea></div><div class="heroActions"><button class="btn primary" id="docSave">Save Document</button><button class="btn" id="docPrint">Print</button></div></section>${appSlotSection('document-tools')}`;$('#docSave').onclick=()=>{state.notes.unshift({id:uid('n'),title:$('#docTitle').value.trim()||'Document',body:$('#docBody').value,date:today()});persist();notify('Document saved')};$('#docExport').onclick=()=>downloadBlob($('#docBody').value,'text/plain',`${($('#docTitle').value||'srs-vision-document').replace(/[^a-z0-9_-]/gi,'_')}.txt`);$('#docPrint').onclick=()=>printHtml($('#docTitle').value||'SRS Vision Document',$('#docBody').value)}
  function renderPdfTools(){$('#content').innerHTML=toolHeader('pdf-tools')+`<section class="workspace"><div class="field"><label>Choose a PDF</label><input class="input" id="pdfFile" type="file" accept="application/pdf"></div><div class="heroActions"><button class="btn primary" id="pdfPrint">Print / Preview</button><button class="btn" id="pdfOpenEdge">Open with Browser</button></div><div class="mutedBox" style="margin-top:14px">For full PDF editing, use one of the dedicated apps below. Microsoft Edge includes a built-in PDF reader; PDFgear and PDF24 provide web tools.</div></section>${appSlotSection('pdf-tools')}`;$('#pdfFile').onchange=e=>{$('#pdfPrint').disabled=!e.target.files?.length};$('#pdfPrint').onclick=()=>{const f=$('#pdfFile').files?.[0];if(!f)return notify('Choose a PDF');const u=URL.createObjectURL(f);window.open(u,'_blank','noopener');setTimeout(()=>URL.revokeObjectURL(u),30000)};$('#pdfOpenEdge').onclick=()=>window.open('https://www.microsoft.com/edge/','_blank','noopener,noreferrer')}
  function renderProductivity(){$('#content').innerHTML=toolHeader('productivity-tools','<button class="btn primary" id="addTaskTop">＋ Task</button>')+`<section class="panel"><div class="panelHead"><h3>Task List</h3><span class="metaChip">${state.tasks.filter(x=>!x.done).length} open</span></div><div class="panelBody events">${state.tasks.map((t,i)=>`<div class="event"><div style="display:flex;justify-content:space-between;gap:8px"><label style="display:flex;gap:8px;align-items:center"><input type="checkbox" data-task="${i}" ${t.done?'checked':''}><b>${esc(t.title)}</b></label><span class="pill ${t.priority==='High'?'pending':t.done?'done':'planning'}">${esc(t.priority)}</span></div></div>`).join('')||'<div class="mutedBox">No tasks.</div>'}</div></section>${appSlotSection('productivity-tools')}`;const add=()=>openModal('Add Task',`<div class="field"><label>Task</label><input class="input" id="taskTitle"></div><div class="field"><label>Priority</label><select class="select" id="taskPriority"><option>High</option><option>Medium</option><option>Low</option></select></div>`,()=>{const title=$('#taskTitle').value.trim();if(!title)throw new Error('Enter task');state.tasks.push({id:uid('t'),title,done:false,priority:$('#taskPriority').value});persist();closeModal();renderProductivity();notify('Task added')});$('#addTaskTop').onclick=add;$$('[data-task]').forEach(b=>b.onchange=()=>{state.tasks[Number(b.dataset.task)].done=b.checked;persist();renderProductivity()})}
  function renderDeveloper(){$('#content').innerHTML=toolHeader('developer-tools','<button class="btn primary" id="devDownload">Download Code</button>')+`<section class="workspace"><div class="field"><label>Code</label><textarea class="textarea" id="codeBox" style="min-height:420px;font-family:ui-monospace,Consolas,monospace">&lt;!doctype html&gt;\n&lt;html&gt;\n&lt;head&gt;&lt;title&gt;SRS Vision&lt;/title&gt;&lt;/head&gt;\n&lt;body&gt;Hello SRS Vision&lt;/body&gt;\n&lt;/html&gt;</textarea></div><div class="heroActions"><button class="btn primary" id="devRun">Run Preview</button><button class="btn" id="devSave">Save Snippet</button></div><div class="mutedBox" style="margin-top:12px">The Run button opens your code in a local preview window. Use the external developer app slots below for full IDE workflows.</div></section>${appSlotSection('developer-tools')}`;$('#devRun').onclick=()=>{const w=window.open('','_blank','width=1000,height=700');if(!w)return;w.document.write($('#codeBox').value);w.document.close()};$('#devSave').onclick=()=>{state.notes.unshift({id:uid('n'),title:'Code Snippet',body:$('#codeBox').value,date:today()});persist();notify('Code snippet saved')};$('#devDownload').onclick=()=>downloadBlob($('#codeBox').value,'text/plain','srs-vision-snippet.html')}
  function renderBusiness(){$('#content').innerHTML=toolHeader('business-tools')+`<section class="workspace"><div class="modalGrid"><div class="field"><label>Client</label><input class="input" id="invClient"></div><div class="field"><label>Invoice Ref</label><input class="input" id="invRef" value="INV-${Date.now().toString().slice(-6)}"></div><div class="field"><label>Item</label><input class="input" id="invItem" value="Creative Service"></div><div class="field"><label>Amount</label><input class="input" id="invAmt" type="number" value="0"></div></div><div class="heroActions"><button class="btn primary" id="invSave">Save Invoice</button><button class="btn" id="invPrint">Print</button></div></section><section class="panel" style="margin-top:14px"><div class="panelHead"><h3>Saved Invoices</h3></div><div class="panelBody events">${state.invoices.map(x=>`<div class="event"><b>${esc(x.ref)} · ${esc(x.client)}</b><small>${money(x.amount)} · ${esc(x.date)}</small></div>`).join('')||'<div class="mutedBox">No invoices.</div>'}</div></section>${appSlotSection('business-tools')}`;$('#invSave').onclick=()=>{const client=$('#invClient').value.trim(),amount=Number($('#invAmt').value||0);if(!client||!amount)return notify('Enter client and amount');const x={id:uid('i'),ref:$('#invRef').value.trim(),client,item:$('#invItem').value.trim(),amount,date:today()};state.invoices.unshift(x);persist();renderBusiness();notify('Invoice saved')};$('#invPrint').onclick=()=>printHtml($('#invRef').value,`Client: ${$('#invClient').value}\nItem: ${$('#invItem').value}\nAmount: ${money($('#invAmt').value)}`)}
  function renderEducation(){$('#content').innerHTML=toolHeader('education-tools')+`<section class="workspace"><div class="field"><label>Study Note</label><textarea class="textarea" id="eduNote"></textarea></div><button class="btn primary" id="eduSave">Save Note</button></section>${appSlotSection('education-tools')}`;$('#eduSave').onclick=()=>{const t=$('#eduNote').value.trim();if(!t)return;state.notes.unshift({id:uid('n'),title:'Education Note',body:t,date:today()});persist();notify('Study note saved')}}
  function renderEntertainment(){$('#content').innerHTML=toolHeader('entertainment-tools')+`<section class="workspace"><div class="pageHead"><div><div class="eyebrow">MINI GAME</div><div class="title">Tic-Tac-Toe</div></div><button class="btn" id="gameReset">Reset</button></div><div id="game" class="toolGrid" style="grid-template-columns:repeat(3,90px);justify-content:center"></div><div class="mutedBox" id="gameStatus">Your turn</div></section>${appSlotSection('entertainment-tools')}`;let board=Array(9).fill(''),turn='X';const win=()=>{for(const [a,b,c] of [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]])if(board[a]&&board[a]===board[b]&&board[a]===board[c])return board[a];return board.every(Boolean)?'Draw':''};const draw=()=>{$('#game').innerHTML=board.map((v,i)=>`<button class="toolSlot" data-cell="${i}" style="min-height:90px;font-size:28px">${v||'·'}</button>`).join('');$$('[data-cell]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.cell);if(board[i]||win())return;board[i]=turn;const w=win();if(w)$('#gameStatus').textContent=w==='Draw'?'Draw':w+' wins';else{turn=turn==='X'?'O':'X';$('#gameStatus').textContent='Turn: '+turn}draw()})};$('#gameReset').onclick=()=>{board=Array(9).fill('');turn='X';$('#gameStatus').textContent='Your turn';draw()};draw()}
  function renderUtilities(){$('#content').innerHTML=toolHeader('utilities-tools')+`<section class="workspace"><div class="title" style="font-size:22px">Calculator</div><div class="calc" style="margin-top:12px"><div class="calcDisplay" id="calcDisplay">0</div>${['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(x=>`<button data-calc="${x}">${x}</button>`).join('')}</div></section>${appSlotSection('utilities-tools')}`;let expr='';const d=$('#calcDisplay');$$('[data-calc]').forEach(b=>b.onclick=()=>{const x=b.dataset.calc;if(x==='='){try{d.textContent=Function('return '+expr)();expr=String(d.textContent)}catch{d.textContent='Error';expr=''}}else{expr+=x;d.textContent=expr}})}
  function renderMusic(){const apps=APPS.music||[];const list=state.music.playlist.map((x,i)=>`<div class="song"><div><b>${esc(x.name)}</b><small>${x.url?'Local track':'Saved track — reselect local file to play'}</small></div><button class="btn primary" data-play="${i}">Play</button><button class="btn danger" data-song-delete="${i}">×</button></div>`).join('')||'<div class="mutedBox">No local tracks. You can still open Spotify/JioSaavn/etc. below.</div>';$('#content').innerHTML=toolHeader('music','<button class="btn primary" id="musicAdd">＋ Add Music</button>')+`<div class="music"><section class="cover"><div><div class="record"></div><div style="text-align:center;margin-top:14px;font-weight:900">SRS VISION MUSIC</div></div></section><section class="player"><div class="eyebrow">NOW PLAYING</div><div class="trackName" id="trackName">Nothing playing</div><div class="trackArtist">Local music player</div><input class="range" id="musicSeek" type="range" min="0" max="100" value="0"><div class="playerBtns"><button class="circleBtn" id="prevSong">◀</button><button class="circleBtn play" id="playPause">▶</button><button class="circleBtn" id="nextSong">▶</button></div><input class="input" id="musicFile" type="file" accept="audio/*" multiple style="display:none"><div class="playlist" style="margin-top:12px">${list}</div></section></div>${appSlotSection('music')}`;$('#musicAdd').onclick=()=>$('#musicFile').click();$('#musicFile').onchange=e=>{for(const f of e.target.files||[]){const url=URL.createObjectURL(f);audioObjectUrls.push(url);state.music.playlist.push({id:uid('s'),name:f.name,url});}persist();renderMusic();notify('Music added to playlist')};let active=-1;const play=i=>{const s=state.music.playlist[i];if(!s)return;if(!s.url){notify('This saved track has no local audio file; add the file again');return}if(currentAudio)currentAudio.pause();const audio=new Audio(s.url);currentAudio=audio;active=i;$('#trackName').textContent=s.name;audio.ontimeupdate=()=>{if(audio.duration)$('#musicSeek').value=audio.currentTime/audio.duration*100};audio.onended=()=>play((active+1)%state.music.playlist.length);audio.play();$('#playPause').textContent='⏸'};$$('[data-play]').forEach(b=>b.onclick=()=>play(Number(b.dataset.play)));$$('[data-song-delete]').forEach(b=>b.onclick=()=>{state.music.playlist.splice(Number(b.dataset.songDelete),1);persist();renderMusic()});$('#playPause').onclick=()=>{if(!currentAudio){if(state.music.playlist.length)play(0)}else if(currentAudio.paused){currentAudio.play();$('#playPause').textContent='⏸'}else{currentAudio.pause();$('#playPause').textContent='▶'}};$('#prevSong').onclick=()=>{if(state.music.playlist.length)play((active-1+state.music.playlist.length)%state.music.playlist.length)};$('#nextSong').onclick=()=>{if(state.music.playlist.length)play((active+1)%state.music.playlist.length)};$('#musicSeek').oninput=e=>{if(currentAudio?.duration)currentAudio.currentTime=currentAudio.duration*(Number(e.target.value)/100)}}

  /* ----------------------------- DATABASE ----------------------------- */
  async function renderDatabase(){
    $('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · LIVE DATA</div><div class="title">Database & Realtime</div><div class="subtitle">One shared Supabase connection; local mode is only a fallback.</div></div><button class="btn primary" id="dbCheck">Check Connection</button></div><section class="kpis"><div class="kpi"><span class="kpiLabel">Connection</span><b id="dbConn">Checking…</b><span class="trend" id="dbConnSub">—</span></div><div class="kpi"><span class="kpiLabel">Realtime</span><b id="dbRt">Checking…</b><span class="trend">Postgres Changes</span></div><div class="kpi"><span class="kpiLabel">Local Queue</span><b>${localStorage.getItem('srsVisionDirty')==='1'?'Pending':'Clear'}</b><span class="trend">Autosave</span></div><div class="kpi"><span class="kpiLabel">Members</span><b>${state.team.members.length}</b><span class="trend">Shared state</span></div></section><div class="bottomGrid"><section class="panel"><div class="panelHead"><h3>Connection Details</h3><button class="btn" id="dbReconnect">Reconnect</button></div><div class="panelBody"><div class="mutedBox" id="dbDetails">Checking Supabase…</div><div class="heroActions"><button class="btn cyan" id="dbSync">Sync Now</button><button class="btn" id="dbReload">Reload Shared Data</button><button class="btn" id="dbExport">Export Backup</button></div></div></section><section class="panel"><div class="panelHead"><h3>Server Setup</h3></div><div class="panelBody events"><div class="event"><b>Anonymous Sign-In</b><small>Required for this no-password workspace.</small></div><div class="event"><b>Table</b><small>public.srs_vision_state</small></div><div class="event"><b>Realtime</b><small>public.srs_vision_state → supabase_realtime publication</small></div><div class="event"><b>RLS</b><small>Authenticated anonymous session can read/write id = 1</small></div></div></div></section></div>`;
    const check=async()=>{const ok=await Live.init();$('#dbConn').textContent=ok?'LIVE':'OFFLINE';$('#dbRt').textContent=Live.status==='online'?'ON':'OFF';$('#dbConnSub').textContent=Live.status;$('#dbDetails').innerHTML=ok?'<b>Supabase connection is working.</b><br>Shared data and Realtime subscription are active.':`<b>${esc(Live.detail||'Connection failed')}</b><br>Local data remains available and will retry.`;updateDbStatus()};$('#dbCheck').onclick=check;$('#dbReconnect').onclick=async()=>{await Live.refresh();await check()};$('#dbSync').onclick=async()=>{await Live.writeNow(true);await check()};$('#dbReload').onclick=async()=>{try{await Live.ensure();const r=await Live.client.from('srs_vision_state').select('data').eq('id',1).single();if(r.error)throw r.error;state=mergeDefaults(r.data.data);saveLocal();localStorage.setItem('srsVisionDirty','0');renderRoute();notify('Shared data reloaded')}catch(e){notify(e?.message||'Reload failed')}};$('#dbExport').onclick=()=>downloadBlob(JSON.stringify(state,null,2),'application/json','srs-vision-backup.json');await check()}

  function renderSettings(){$('#content').innerHTML=`<div class="pageHead"><div><div class="eyebrow">SRS VISION · SETTINGS</div><div class="title">Settings</div><div class="subtitle">Appearance and local platform preferences.</div></div></div><section class="workspace"><div class="modalGrid"><div class="field"><label>Theme</label><select class="select" id="setTheme"><option value="blue">Blue / Cyan / Purple</option><option value="purple">Purple</option><option value="green">Green</option></select></div></div><div class="heroActions"><button class="btn primary" id="setSave">Save Settings</button><button class="btn" id="setReset">Reset Local State</button></div></section>`;$('#setTheme').value=settings.theme||'blue';$('#setSave').onclick=()=>{settings.theme=$('#setTheme').value;saveSettings();shell();renderRoute();notify('Settings saved')};$('#setReset').onclick=()=>{if(confirm('Reset only local state? Supabase data is not deleted.')){localStorage.removeItem(STORAGE_KEY);localStorage.removeItem('srsVisionDirty');state=clone(initialState);renderSettings();notify('Local state reset')}}}

  /* ---------------------------- MODALS -------------------------------- */
  let modalSave=null;
  function ensureModal(){if($('#modal'))return;document.body.insertAdjacentHTML('beforeend',`<div class="modal" id="modal"><div class="modalBox"><div class="modalHead"><h3 id="modalTitle">Edit</h3><button class="btn" id="modalClose">×</button></div><div id="modalBody"></div><div class="heroActions" style="justify-content:flex-end"><button class="btn ghost" id="modalCancel">Cancel</button><button class="btn primary" id="modalSave">Save</button></div></div></div>`);$('#modalClose').onclick=closeModal;$('#modalCancel').onclick=closeModal;$('#modalSave').onclick=()=>{try{modalSave?.()}catch(e){notify(e?.message||'Could not save')}}}
  function openModal(title,html,save){ensureModal();$('#modalTitle').textContent=title;$('#modalBody').innerHTML=html;modalSave=save;$('#modal').classList.add('open')}
  function closeModal(){const m=$('#modal');if(m)m.classList.remove('open');modalSave=null}
  window.openModal=openModal;window.closeModal=closeModal;

  /* ----------------------------- EVENTS -------------------------------- */
  function bindEvents(){
    document.addEventListener('click',e=>{
      const n=e.target.closest?.('[data-nav]');if(n){e.preventDefault();navigate(n.dataset.nav);return;}
      const me=e.target.closest?.('[data-member-edit]');if(me){editMember(Number(me.dataset.memberEdit));return;}
      const mc=e.target.closest?.('[data-member-custom]');if(mc){const i=Number(mc.dataset.memberCustom),m=state.team.members[i];openModal(`Custom Fields · ${m.name}`,`<div class="field"><label>Skills</label><input class="input" id="cfSkills" value="${esc(m.skills)}"></div><div class="field"><label>Availability / Notes</label><input class="input" id="cfNotes" value="${esc(m.notes)}"></div>`,()=>{m.skills=$('#cfSkills').value.trim();m.notes=$('#cfNotes').value.trim();persist();closeModal();renderTeam();notify('Member custom fields saved')});return;}
      const md=e.target.closest?.('[data-member-delete]');if(md){const i=Number(md.dataset.memberDelete);if(confirm(`Remove ${state.team.members[i].name}?`)){state.team.members.splice(i,1);persist();renderTeam();notify('Member removed')}}
      if(e.target.closest?.('[data-add-member]')){addMember();return;}
      if(e.target.closest?.('[data-add-project]')){addProject();return;}
      const ep=e.target.closest?.('[data-edit-project]');if(ep){editProject(Number(ep.dataset.editProject));return;}
      if(e.target.closest?.('[data-add-event]')){addEvent();return;}
      const ee=e.target.closest?.('[data-edit-event]');if(ee){addEvent(Number(ee.dataset.editEvent));return;}
      const de=e.target.closest?.('[data-delete-event]');if(de){state.calendar.splice(Number(de.dataset.deleteEvent),1);persist();renderCalendar();notify('Event deleted');return;}
      if(e.target.closest?.('[data-add-client]')){editClient(-1);return;}
      const ec=e.target.closest?.('[data-edit-client]');if(ec){editClient(Number(ec.dataset.editClient));return;}
      if(e.target.closest?.('[data-add-transaction]')){addTransaction();return;}
      if(e.target.closest?.('[data-add-bank]')){addBank();return;}
      const be=e.target.closest?.('[data-bank-edit]');if(be){addBank(Number(be.dataset.bankEdit));return;}
      const bd=e.target.closest?.('[data-bank-deposit]');if(bd){bankAction(Number(bd.dataset.bankDeposit),'deposit');return;}
      const bw=e.target.closest?.('[data-bank-withdraw]');if(bw){bankAction(Number(bw.dataset.bankWithdraw),'withdraw');return;}
      const aa=e.target.closest?.('[data-add-app]');if(aa){addApp(aa.dataset.addApp);return;}
      const ea=e.target.closest?.('[data-edit-app]');if(ea){const [cat,i]=ea.dataset.editApp.split(':');addApp(cat,Number(i));return;}
      const da=e.target.closest?.('[data-delete-app]');if(da){const [cat,i]=da.dataset.deleteApp.split(':');if(confirm('Delete this custom app slot?')){state.customApps[cat].splice(Number(i),1);persist();renderAppManager();notify('App slot deleted')}}
    });
  }

  /* ------------------------------- ROUTER ------------------------------ */
  function renderRoute(){
    if(!TOOL_META[route] && !['dashboard','projects','team','calendar','reports','clients','files','notifications','money-transfer','accounts','banking','account','app-manager','database','settings'].includes(route))route='dashboard';
    updateDbStatus();
    if(route==='dashboard')return renderMain();
    if(route==='projects')return renderProjects();
    if(route==='team')return renderTeam();
    if(route==='calendar')return renderCalendar();
    if(route==='reports')return renderReports();
    if(route==='clients')return renderClients();
    if(route==='files')return renderFiles();
    if(route==='notifications')return renderNotifications();
    if(route==='money-transfer')return renderMoney();
    if(route==='accounts')return renderAccounts();
    if(route==='banking')return renderBanking();
    if(route==='account')return renderAccount();
    if(route==='app-manager')return renderAppManager();
    if(route==='database')return renderDatabase();
    if(route==='settings')return renderSettings();
    if(TOOL_META[route])return renderTool(route);
  }

  function downloadBlob(text,type,name){const u=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),500)}
  function downloadData(data,name){const a=document.createElement('a');a.href=data;a.download=name;a.click()}
  function printHtml(title,body){const w=window.open('','_blank','width=900,height=800');if(!w)return;w.document.write(`<!doctype html><html><head><title>${esc(title)}</title><style>body{font:16px/1.6 Arial;padding:40px}h1{margin-top:0}pre{white-space:pre-wrap}</style></head><body><h1>${esc(title)}</h1><pre>${esc(body)}</pre></body></html>`);w.document.close();setTimeout(()=>w.print(),250)}

  /* --------------------------- STARTUP --------------------------------- */
  bindEvents();
  ensureModal();
  shell();
  renderRoute();
  setTimeout(()=>Live.init(),150);
  window.addEventListener('online',()=>Live.init());
  window.addEventListener('beforeunload',()=>{if(localStorage.getItem('srsVisionDirty')==='1')Live.writeNow(false)});

})();
