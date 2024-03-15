class Box {

	constructor(row, column) {
		this.row = row
		this.column = column

		this.remainingEdges = 4
		this.edges = {
			top: new Edge(this, "top"),
			right: new Edge(this, "right"),
			bottom: new Edge(this, "bottom"),
			left: new Edge(this, "left"),
		}
		this.inverseEdges = {
			top: null,
			right: null,
			bottom: null,
			left: null,
		}
		this.adjacentBoxes = {}
		this.filled = false

		this.ui = this.createUI()
	}

	getEdge(edgePosition) {
		return this.edges[edgePosition]
	}

	getAdjacentBox(edgePosition) {
		return this.adjacentBoxes[edgePosition]
	}

	getLastRemainingEdge() {
		for (const [position, edge] of Object.entries(this.edges))
			if (!edge.filled) return this.edges[position]

		return null
	}

	fillEdge(edge) {
		edge.fill()
	}

	fill(color) {
		if (!this.filled) {
			this.filled = true
			this.remainingEdges = 0
			this.ui.style.background = color
			this.ui.classList.add("filled")
			// Get the current player index
			const currentPlayerIndex = Game.instance.currentPlayerIndex

			// only if 2 players are playing
			if (Game.instance.players.length === 2) {
				this.ui.textContent = currentPlayerIndex === 0 ? "+" : "-"
				this.ui.style.textAlign = "center"
				this.ui.style.lineHeight = "50px"
				this.ui.style.fontSize = "20px"
				this.ui.style.color = "black"
			}


			Game.instance.invokeEvent("boxFill", this)
		}
	}

	createUI() {
		const ui = document.createElement("div")

		ui.setAttribute("class", "box")
		ui.setAttribute("data-row", this.row)
		ui.setAttribute("data-column", this.column)

		ui.appendChild(this.edges.top.ui)
		ui.appendChild(this.edges.right.ui)
		ui.appendChild(this.edges.bottom.ui)
		ui.appendChild(this.edges.left.ui)

		return ui
	}

}
