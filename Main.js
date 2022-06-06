class Main{

	constructor(){
		this.sudoku=new Sudoku();
		this.tablero=this.sudoku.tablero;
	}

	pedirNumero(){
		let mensaje="Tamaño del tablero: "+Diccionario.tamanio.tablero;
		mensaje+="\n"+this.tablero.mostrar();
		mensaje+="Ingrese una posición la fila, columna, número. Separados por comas";
		let posicion=Util.entradaDato(mensaje,0).replaceAll(" ","").split(",");
		let fila=(posicion[0]??0)-1;
		let columna=(posicion[1]??0)-1;
		let numero=(posicion[2]??0);
		if(!this.tablero.ponerNumero(fila,columna,numero)){
			alert("La posición o número no es válido");
		}
		this.pedirNumero();
		console.log(Sudoku.numeros);
	}

}