class Consola{

	constructor(){
		this.sudoku=new Sudoku();
		this.tablero=this.sudoku.tablero_resolver;
	}

	pedirNumero(){
		let mensaje="Tamaño del tablero: "+Diccionario.num.tablero;
		mensaje+="\n"+this.sudoku.mostrar();
		mensaje+="Ingrese una posición la fila, columna, número. Separados por comas";
		let posicion=Util.entradaDato(mensaje,0).replaceAll(" ","").split(",");
		let fila=(posicion[0]??0)-1;
		let columna=(posicion[1]??0)-1;
		let numero=(posicion[2]??0);
		if(!this.sudoku.ponerNumero(fila,columna,numero)){
			alert("La posición o número no es válido");
		}
		if(Sudoku.numeros<this.sudoku.tam_tablero){
			this.pedirNumero();
		}else{
			alert("Juego terminado!!!");
			this.sudoku.mostrar();
		}
	}

}