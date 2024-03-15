class Edge {

	constructor(box, position) {
		this.box = box
		this.filled = false
		this.position = position

		this.ui = this.createUI()
	}
	//Getting inverse edge
	get inverseEdge() {
		return this.box.inverseEdges[this.position]
	}

	//Filling edge
	fill() {
		if (!this.filled) {
			this.filled = true
			this.ui.classList.add("filled")

			// const currentPlayer = Game.instance.currentPlayer;
			// this.ui.style.background = currentPlayer.color;
			// this.ui.style.opacity = "0.5";
			// this.ui.style.filter = "brightness(80%)";


			Game.instance.invokeEvent("edgeFill", this)
		}
	}
	//Creating UI
	createUI() {
		const user_interface = document.createElement("button")
		user_interface.setAttribute("data-position", this.position)
		user_interface.classList.add("edge")
		user_interface.classList.add(this.position)
		return user_interface
	}

}
