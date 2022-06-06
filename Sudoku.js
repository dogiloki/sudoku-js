class Sudoku{

	constructor(){
		this.tablero;
		this.tablero_resolver;
		this.tam_subtablero;
		this.tam_tablero;
		this.dimencionar();
	}

	static numeros=0;

	dimencionar(){
		this.tam_subtablero=Diccionario.num.sub_tablero;
		this.tam_tablero=this.tam_subtablero*Diccionario.num.tablero;
		this.vaciar();
	}

	vaciar(){
		this.tablero=[];
		this.tablero_resolver=[];
		for(let a=0; a<this.tam_tablero; a++){
			this.tablero[a]=[];
			this.tablero_resolver[a]=[];
			for(let b=0; b<this.tam_tablero; b++){
				this.tablero[a][b]=Diccionario.casilla_vacia;
				this.tablero_resolver[a][b]=Diccionario.casilla_vacia;
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
						if(this.ponerNumero(a,b,numeros[c])){
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
			this.tablero_resolver[coords.fila][coords.columna]=this.tablero[coords.fila][coords.columna];
		}
	}

	mostrar(){
		let tabla="";
		for(let a=0; a<this.tam_tablero; a++){
			for(let b=0; b<this.tam_tablero; b++){
				tabla+=" "+this.tablero[a][b]+" ";
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
		if(!this.posicionValida(fila,columna)){
			return false;
		}
		if(numero==""){
			Sudoku.numeros-=(Sudoku.numeros==0 || this.tablero[fila][columna]==Diccionario.casilla_vacia)?0:1;
			this.tablero[fila][columna]=Diccionario.casilla_vacia;
			return true;
		}
		if(!(Util.esNumero(numero) && !Util.esDecimal(numero))){
			return false;
		}
		if(numero<=0 || numero>this.tam_tablero){
			return false;
		}
		if(this.tablero[fila][columna]==numero){
			return false;
		}
		if(this.numeroRepetido(fila,columna,numero)){
			return false;
		}
		this.tablero[fila][columna]=numero;
		Sudoku.numeros++;
		return true;
	}

	posicionValida(fila,columna){
		return (fila<this.tam_tablero && columna<this.tam_tablero && fila>=0 && columna>=0);
	}

	numeroRepetido(fila,columna,numero=""){
		if(!this.posicionValida(fila,columna)){
			return true;
		}
		// Verifica dentro del subtablero
		let inicio=this.inicioSubtablero(fila,columna);
		for(let a=inicio.fila; a<inicio.fila+this.tam_subtablero; a++){
			for(let b=inicio.columna; b<inicio.columna+this.tam_subtablero; b++){
				if(this.tablero[a][b]==numero){
					return true;
				}
			}
		}
		// Verifica en forma de cruz
		for(let a=0; a<this.tam_tablero; a++){
			if(this.tablero[a][columna]==numero || this.tablero[fila][a]==numero){
				return true;
			}
		}
		return false;
	}

	inicioSubtablero(fila,columna){
		return {
			fila: Math.floor(fila/this.tam_subtablero)*this.tam_subtablero,
			columna: Math.floor(columna/this.tam_subtablero)*this.tam_subtablero
		};
	}

	coordenadas(num){
		let fila=Math.ceil(num/this.tam_tablero);
		let columna=Math.ceil(num%this.tam_tablero);
		columna=columna==0?this.tam_tablero:columna;
		return {
			fila: fila-1,
			columna: columna-1
		};
	}

}