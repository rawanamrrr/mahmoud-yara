const http=require('http'),fs=require('fs'),path=require('path');
const T={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.gif':'image/gif','.mp3':'audio/mpeg','.svg':'image/svg+xml'};
http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);let f=path.join(__dirname,p);
if(!fs.existsSync(f)||fs.statSync(f).isDirectory())f=path.join(__dirname,'index.html');
r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r);}).listen(8123,()=>console.log('up'));
