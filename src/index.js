import gol from './gol';
import csl from './rendering/console';
import generator from './generator'

let done = false;
let generations = 40;
let ttl = 300;
let gridSize = [25, 25];
let renderOptions = {live: '[0]', joinWith: '', cycler: ['\'', '`']};

const glider = (grid) => {
  grid = gol.spawn(grid, 0, 2);
  grid = gol.spawn(grid, 1, 3);
  grid = gol.spawn(grid, 2, 1);
  grid = gol.spawn(grid, 2, 2);
  return gol.spawn(grid, 2, 3);
}

let iteration = {grid: glider(gol.grid(...gridSize))};

let draw = (newGeneration) => {
  let {grid, birthDate, generation} = newGeneration;

  if(birthDate != iteration['birthDate']) {
    done = generation >= generations;
    iteration = newGeneration;
    csl.render(grid, renderOptions);
    console.log(`gen: ${generation}`);
  }
}

// TODO: a better way to make this available?
window.start = (gens = generations, cols = gridSize[0], rows = gridSize[1]) => {
  done = false;
  generations = gens;
  iteration = {grid: glider(gol.grid(cols, rows))};
  requestAnimationFrame(loop);
};

window.stop = () => {
  done = true;
  console.clear();
}

const loop = () => {
  if(done) {
    console.log("that was a good run");
    return;
  }
  generator.nextGen(iteration, Date.now(), {ttl: ttl, gol:gol}, draw);
  requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
