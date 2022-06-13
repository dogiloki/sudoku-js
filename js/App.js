var template_tablero=document.getElementById("template-tablero").content;
var content_tablero=document.getElementById("content_tablero");
var fragment=document.createDocumentFragment();

// Ejecutar al cargar el DOM
document.addEventListener("DOMContentLoaded",()=>{
	this.pintar();
});

var sudoku;

async function pintar(){

	sudoku=await new Sudoku();
	let tablero=sudoku.tablero;
	let resultado=sudoku.resultado;
	let conta=1;
	console.log(sudoku.mostrar(true));
	let content_subtablero=this.template_tablero.getElementById('subtablero').cloneNode(true);
	let content_tablero=document.createElement("div");
	content_tablero.setAttribute("style","display: block;");
	tablero.forEach(function(subtablero,a){
		let content_fila=this.template_tablero.getElementById('fila').cloneNode(true);
		subtablero.forEach(function(casilla,b){
			let texto=casilla.texto;
			let pista=casilla.pista;
			let content_columna=this.template_tablero.getElementById('columna').cloneNode(true);
			let content_casilla=this.template_tablero.getElementById("casilla").cloneNode(true);
			if((b+1)%sudoku.tam_subtablero==0){
				content_casilla.setAttribute("style","box-shadow: 3px 0px #c2c2c2;");
			}
			if((a+1)%sudoku.tam_subtablero==0){
				content_columna.setAttribute("style","box-shadow: 0px 3px #c2c2c2;");
			}
			content_casilla.value=texto==0?"":texto;
			if(pista){
				content_casilla.classList.add("casilla-pista");
				content_casilla.setAttribute("readonly","");
			}else{
				content_casilla.setAttribute("onkeydown","cambio("+conta+")");
				content_casilla.setAttribute("onkeyup","cambio("+conta+")");
				content_casilla.setAttribute("onclick","cambio("+conta+")");
			}
			content_casilla.setAttribute("name",conta);
			conta++;
			content_columna.appendChild(content_casilla);
			content_fila.appendChild(content_columna);
		});
		content_tablero.appendChild(content_fila);
	});
	this.content_tablero.appendChild(content_tablero);

	//let clone=this.template_tablero.cloneNode(true);
	//this.content_tablero.appendChild(clone);
}

function cambio(name){
	let caja=document.getElementsByName(name)[0];
	let num=caja.value;
	let casillas=document.getElementsByClassName("casilla");
	for(let casi of casillas){
		casi.setAttribute("style","color: #353535");	
	}
	if(Util.esNumero(num) && num<=sudoku.tam_tablero && num>0){
		let coords_num=sudoku.coordenadas(name);
		let numeros=sudoku.numeroRepetido(coords_num.fila,coords_num.columna,num);
		if(numeros!=null){
			numeros.forEach(coord_repi=>{
				let posicion=sudoku.posicion(coord_repi.fila,coord_repi.columna);
				document.getElementsByName(posicion)[0].setAttribute("style","color: red");
			});
		}
	}else{
		caja.value="";
	}
}

function cambiarDimenciones(){
	
}