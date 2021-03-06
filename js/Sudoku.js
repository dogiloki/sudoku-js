class Sudoku{

	constructor(){
		this.tablero;
		this.resultado;
		this.tam_subtablero;
		this.tam_tablero;
		this.numeros=0;
		this.dimencionar();
	}

	dimencionar(){
		this.tam_subtablero=Diccionario.num.sub_tablero;
		this.tam_tablero=this.tam_subtablero*Diccionario.num.tablero;
		this.vaciar();
	}

	vaciar(){
		this.tablero=[];
		this.resultado=[];
		for(let a=0; a<this.tam_tablero; a++){
			this.tablero[a]=[];
			this.resultado[a]=[];
			for(let b=0; b<this.tam_tablero; b++){
				this.tablero[a][b]={
					texto: Diccionario.casilla_vacia,
					pista: false
				}
				this.resultado[a][b]={
					texto: Diccionario.casilla_vacia,
					pista: false
				}
			}
		}
		this.generar();
	}

	generar(){
		let max_subtablero=Math.pow(this.tam_subtablero,2);
		let max_tablero=Math.pow(this.tam_tablero,2);
		let numeros=Util.numeroAleatorio(max_subtablero,1,max_subtablero);
		let posiciones=Util.numeroAleatorio(max_tablero,1,Diccionario.num.pistas);
		let fila=0, columna=0;
		do{
			numeros.reverse();
			for(let a=fila; a<fila+this.tam_subtablero; a++){
				for(let b=columna; b<columna+this.tam_subtablero; b++){
					for(let c=0; c<numeros.length; c++){
						if(this.numeroRepetido(a,b,numeros[c],this.resultado)==null){
							this.resultado[a][b].texto=numeros[c];
							c=numeros.length;
						}
					}
				}
			}
			if(columna==this.tam_tablero-this.tam_subtablero){
				fila+=this.tam_subtablero;
				columna=0;
			}else{
				columna+=this.tam_subtablero;
			}
		}while(fila!=this.tam_tablero && columna!=this.tam_tablero);
		// Llenar tablero a resolver con pistas
		for(let posicion of posiciones){
			let coords=this.coordenadas(posicion);
			this.resultado[coords.fila][coords.columna].pista=true;
			this.tablero[coords.fila][coords.columna]={
				texto: this.resultado[coords.fila][coords.columna].texto,
				pista: true
			}
			this.numeros++;
		}
	}

	mostrar(resuelto=false){
		let tabla="";
		for(let a=0; a<this.tam_tablero; a++){
			for(let b=0; b<this.tam_tablero; b++){
				tabla+=" "+(resuelto?this.resultado[a][b]:this.tablero[a][b]).texto+" ";
				if((b+1)%this.tam_subtablero==0){
					tabla+=" | ";
				}
			}
			tabla+="\n";
			if((a+1)%this.tam_subtablero==0){
				for(let b=0; b<this.tam_tablero+this.tam_subtablero; b++){
					tabla+=" - ";
				}
			}
			tabla+="\n";
		}
		return tabla;
	}

	ponerNumero(fila,columna,numero=""){
		if(numero=="" && !this.tablero[fila][columna].pista){
			this.numeros-=(this.numeros==0 || this.tablero[fila][columna].texto==Diccionario.casilla_vacia)?0:1;
			this.tablero[fila][columna].texto=Diccionario.casilla_vacia;
			return true;
		}
		if(!this.posicionValida(fila,columna)){
			return false;
		}
		if(!(Util.esNumero(numero) && !Util.esDecimal(numero))){
			return false;
		}
		if(numero<=0 || numero>this.tam_tablero || this.tablero[fila][columna].texto==numero || this.tablero[fila][columna].pista){
			return false;
		}
		if(this.numeroRepetido(fila,columna,numero)!=null){
			return false;
		}
		this.tablero[fila][columna].texto=numero;
		this.numeros++;
		return true;
	}

	posicionValida(fila,columna){
		return (fila<this.tam_tablero && columna<this.tam_tablero && fila>=0 && columna>=0);
	}

	numeroRepetido(fila,columna,numero="",tablero=this.tablero){
		let repetidos=[];
		// Verifica dentro del subtablero
		let inicio=this.inicioSubtablero(fila,columna);
		for(let a=inicio.fila; a<inicio.fila+this.tam_subtablero; a++){
			for(let b=inicio.columna; b<inicio.columna+this.tam_subtablero; b++){
				if(tablero[a][b].texto==numero){
					repetidos.push({fila: a, columna: b});
				}
			}
		}
		// Verifica en forma de cruz
		for(let a=0; a<this.tam_tablero; a++){
			if(tablero[a][columna].texto==numero){
				repetidos.push({"fila": a, "columna": columna});
			}
			if(tablero[fila][a].texto==numero){
				repetidos.push({"fila": fila, "columna": a});
			}
		}
		return repetidos.length<=0?null:repetidos;
	}

	inicioSubtablero(fila,columna){
		return {
			fila: Math.floor(fila/this.tam_subtablero)*this.tam_subtablero,
			columna: Math.floor(columna/this.tam_subtablero)*this.tam_subtablero
		};
	}

	coordenadas(posicion){
		let fila=Math.ceil(posicion/this.tam_tablero);
		let columna=Math.ceil(posicion%this.tam_tablero);
		columna=columna==0?this.tam_tablero:columna;
		return {
			fila: fila-1,
			columna: columna-1
		};
	}

	posicion(fila,columna){
		return (fila*this.tam_tablero+(columna+1));
	}

}