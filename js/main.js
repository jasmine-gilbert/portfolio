document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if(toggle && links){
    toggle.addEventListener('click', ()=>{
      links.classList.toggle('open');
    });
  }

  // Allow dropdowns to open on tap for small screens
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dd=>{
    dd.addEventListener('click', (e)=>{
      if(window.innerWidth <= 800){
        // toggle only the clicked dropdown menu
        const menu = dd.querySelector('.dropdown-menu');
        if(menu) menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
        e.stopPropagation();
      }
    });
  });

  // Close menus when clicking outside
  document.addEventListener('click', ()=>{
    if(window.innerWidth <= 800){
      document.querySelectorAll('.dropdown-menu').forEach(m=>m.style.display='none');
    }
  });

  // Scrolling code lines background animation
  const canvas = document.getElementById('bg-canvas');
  if(canvas){
    const ctx = canvas.getContext('2d');
    let width, height;
    function resize(){
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initColumns();
    }
    window.addEventListener('resize', resize);

    const fontSize = 13;
    const lineHeight = 22;
    const codeSnippets = [
      'const router = require("express");',
      'function ping(host) { return exec(host); }',
      'ip route 0.0.0.0 0.0.0.0 192.168.1.1',
      'ssh admin@10.0.0.1 -p 22',
      'SELECT * FROM users WHERE active=1;',
      'interface GigabitEthernet0/1',
      'firewall-policy id 1 action accept',
      'git commit -m "fix: network config"',
      'vlan 10 name ADMIN',
      'nmap -sV -p 1-1024 192.168.0.0/24',
      'sudo systemctl restart nginx',
      'iptables -A INPUT -p tcp --dport 443 -j ACCEPT',
      'dns-server 8.8.8.8 8.8.4.4',
      'netstat -tulnp | grep LISTEN',
      'chmod 755 /etc/scripts/backup.sh',
      'Set-ADUser -Identity jgilbert -Enabled $true',
      'ping -c 4 192.168.1.254',
      'traceroute google.com',
      'cat /var/log/syslog | grep ERROR',
      'rsync -avz /data/ backup@server:/remote/',
    ];

    let columns = [];
    function initColumns(){
      columns = [];
      const colWidth = 420;
      const count = Math.ceil(width / colWidth) + 1;
      for(let i = 0; i < count; i++){
        columns.push({
          x: i * colWidth + Math.random() * 80,
          y: Math.random() * -height,
          speed: 0.3 + Math.random() * 0.4,
          lines: generateLines(),
          opacity: 0.06 + Math.random() * 0.08,
        });
      }
    }

    function generateLines(){
      const arr = [];
      const count = 18 + Math.floor(Math.random() * 10);
      for(let i = 0; i < count; i++){
        arr.push(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
      }
      return arr;
    }

    function draw(){
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px "Courier New", monospace`;

      columns.forEach(col => {
        col.y += col.speed;
        const blockHeight = col.lines.length * lineHeight;
        if(col.y > height + blockHeight){
          col.y = -blockHeight - 40;
          col.lines = generateLines();
          col.opacity = 0.06 + Math.random() * 0.08;
        }
        col.lines.forEach((line, i) => {
          const alpha = col.opacity * (1 - i / col.lines.length * 0.4);
          ctx.fillStyle = `rgba(180, 220, 255, ${alpha})`;
          ctx.fillText(line, col.x, col.y + i * lineHeight);
        });
      });

      requestAnimationFrame(draw);
    }

    resize();
    draw();
  }

  // Contact form handling (client-side simulation)
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const form = e.currentTarget;
      const data = new FormData(form);
      const prenom = data.get('prenom')?.trim();
      const nom = data.get('nom')?.trim();
      const email = data.get('email')?.trim();
      const message = data.get('message')?.trim();
      if(!prenom || !nom || !email || !message){
        alert('Merci de remplir tous les champs.');
        return;
      }
      // Simulate send: show thank you message and clear form
      document.getElementById('contact-thanks').classList.remove('hidden');
      form.reset();
    });
  }
});
