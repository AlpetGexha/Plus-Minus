class GeneticAlgorithm {
    constructor(populationSize, mutationRate, fitnessFunction, generateRandomSolution) {
        this.populationSize = populationSize;
        this.mutationRate = mutationRate;
        this.fitnessFunction = fitnessFunction;
        this.generateRandomSolution = generateRandomSolution;
        this.population = Array.from({ length: populationSize }, generateRandomSolution);
    }

    run() {
        while (!this.shouldTerminate()) {
            this.population.sort((a, b) => this.fitnessFunction(b) - this.fitnessFunction(a));
            this.population = this.population.slice(0, this.populationSize / 2);
            while (this.population.length < this.populationSize) {
                const parent1 = this.selectParent();
                const parent2 = this.selectParent();
                let child = this.crossover(parent1, parent2);
                if (Math.random() < this.mutationRate) {
                    child = this.mutate(child);
                }
                this.population.push(child);
            }
        }
        return this.population[0];
    }

    crossover(parent1, parent2) {
        let crossoverPoint = Math.floor(Math.random() * parent1.length);

        // Create the child by combining the parents' genes
        let child = parent1.slice(0, crossoverPoint).concat(parent2.slice(crossoverPoint));

        return child;
    }


    mutate(solution) {
        // Choose a random mutation point
        let mutationPoint = Math.floor(Math.random() * individual.length);

        // Flip the bit at the mutation point
        individual[mutationPoint] = 1 - individual[mutationPoint];

        return individual;
    }

    shouldTerminate() {
        // return this.currentGeneration >= this.maxGenerations;
    }
    // Selection function
    selectParent(population) {
        // Calculate the total fitness of the population
        let totalFitness = population.reduce((total, individual) => total + individual.fitness, 0);

        // Select a random fitness value
        let randomFitness = Math.random() * totalFitness;

        // Find the first individual whose fitness is greater than or equal to the random value
        let cumulativeFitness = 0;
        for (let individual of population) {
            cumulativeFitness += individual.fitness;
            if (cumulativeFitness >= randomFitness) {
                return individual;
            }
        }

        // If no individual is found, return the last one
        return population[population.length - 1];
    }
}