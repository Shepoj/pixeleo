let canvas= document.getElementById("canva");
let couleur= document.getElementById("couleur");
let ctx = canvas.getContext("2d");
let mode="standard";
let lastBomb=0;
let lastClic=00;
let testMode=false;
const size = 10;

function drawPix(posx,posy,color){
		ctx.fillStyle = color
		ctx.fillRect(posx-(size/2), posy-(size/2), size, size); 
}
		function getCursorPosition(canvas, event) {
    			const rect = canvas.getBoundingClientRect()
				const x = event.clientX - rect.left
				const y = event.clientY - rect.top
				return [x,y]
		}
		function f(x){
			return Math.sqrt(1-x**2)||0
		}
		function sms(x,y){
			for(let i=0;i<=4;i++){
				[grid[x+i][y],grid[x-i][y],grid[x][y+i],grid[x][y-i]]=[couleur.value,couleur.value,couleur.value,couleur.value]
			}
		}
		function bomb(x,y,power){
			for(let i=0;i<(grid.length);i++){
				for(let j=0;j<(grid[0].length);j++){
					let dist = Math.sqrt((i-x)**2+(j-y)**2)
					let prob = f(dist/power)
					if(Math.random()<prob){grid[i][j]=couleur.value}
				}
			}
		}
		function visite(){
			ctx.clearRect(0,0,canvas.width,canvas.height)
			
			for(let i=0;i<(grid.length);i++){
				for(let j=0;j<(grid[0].length);j++){
					drawPix(i*size,j*size,grid[i][j])
				}
			}
			window.requestAnimationFrame(visite)
		}
		document.addEventListener("keydown",function(f){
			if(f.keyCode==66){
				mode="bombe"
			}
			else if(f.keyCode==170){
				if(testMode==false){
					testMode=true}
				else{testMode=false}
			}
			else if (f.keyCode==222){
				if(testMode==true){mode="EASTER"}
			}
			else if(f.keyCode=88){
				mode="sms"
			}})
		canvas.addEventListener('click', function(e){
  			[x,y]=getCursorPosition(canvas, e)
			let gridx=Math.round(x/size)
			let gridy=Math.round(y/size)
			console.log(gridx,gridy)
			if(mode=="bombe" && testMode==false){
				if(new Date().getTime()-lastBomb>=3600000){
					bomb(gridx,gridy,3)
					mode="standard"
					lastBomb=new Date().getTime()
				}
				else{mode ="standard"}
			}
			else if(mode=="EASTER"){
				bomb(gridx,gridy,10)
				mode="standard"}
			else if(mode=="sms"){
				sms(gridx,gridy)
				console.log("pog")
				mode="standard"}
			else if(mode=="bombe"){
				bomb(gridx,gridy,3)
				mode="standard"
			}
			else if(testMode==true){grid[gridx][gridy]=couleur.value} 	
			else if(new Date().getTime()-lastClic >=3000){
				grid[gridx][gridy]=couleur.value
				lastClic=new Date().getTime()
			} 	
		})
		let grid = []
		for(let i=0;i<(canvas.width/size);i++){
			grid[i]=[]
			for(let j=0;j<(canvas.height/size);j++){
				grid[i][j]='rgb(255,255,255)'//"rgb("+Math.floor(Math.random()*255)+", "+Math.floor(Math.random()*255)+", "+Math.floor(Math.random()*255)+")"
			}
		}
		visite()