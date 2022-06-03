class Tablero{

	constructor(){
		this.tablero;
		this.tam_subtablero;
		this.tam_tablero;
		this.dimencionar();
	}

	dimencionar(){
		this.tam_subtablero=Diccionario.tamanio.sub_tablero;
		this.tam_tablero=this.tam_subtablero*Diccionario.tamanio.tablero;
		this.vaciar();
	}

	vaciar(){
		this.tablero=new Array(this.tam_tablero);
		for(let a=0; a<this.tam_tablero; a++){
			this.tablero[a]=new Array(this.tam_tablero);
			for(let b=0; b<this.tam_tablero; b++){
				this.tablero[a][b]=Diccionario.casilla_vacia;
			}
		}
	}

	mostrar(){
		let tabla="";
		for(let a=0; a<this.tam_tablero; a++){
			for(let b=0; b<this.tam_tablero; b++){
				tabla+=this.tablero[a][b]+" | ";
			}
			tabla+="\n";
		}
		console.log(tabla);
	}

	ponerNumero(fila,columna,numero){
		if(numero<0 && numero>this.tam_tablero){
			return -1;
		}
		let inicio=this.inicioSubtablero(fila,columna);
		console.log(inicio);
		for(let a=0; a<this.tam_tablero; a++){
			if(this.tablero[a][columna]==numero || this.tablero[fila][a]==numero){
				return -1;
			}
		}
		for(let a=inicio.fila; a<inicio.fila+this.tam_subtablero; a++){
			for(let b=inicio.columna; b<inicio.columna+this.tam_subtablero; b++){
				if(this.tablero[a][b]==numero){
					return -1;
				}
			}
		}
		this.tablero[fila][columna]=numero;
		this.mostrar();
	}

	inicioSubtablero(fila,columna){
		return {
			fila: Math.floor(fila/this.tam_subtablero)*this.tam_subtablero,
			columna: Math.floor(columna/this.tam_subtablero)*this.tam_subtablero
		};
	}

}