class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.filledBoxes = 0;
        this.filledBoxesUI = null;
    }

    updateScore() {
        if (this.filledBoxesUI) {
            this.filledBoxesUI.innerText = this.filledBoxes;
        }
    }

    setScoreUI(element) {
        this.filledBoxesUI = element;
    }
}