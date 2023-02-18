import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

interface LocalApiError {
  code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    // Inspect the error, see if it says file doesn't exist
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === 'string';
    };
    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      res.send(JSON.parse(result));
    } catch (err) {
      // Use type predicate to narrow error
      if (isLocalApiError(err)) {
        if (err.code === 'ENOENT') {
          // Initial cells to populate notebook if a notebook isn't found
          // Formatting important!
          const firstTextcell = {
            id: '12345',
            type: 'text',
            content: `# Welcome to JSWB: Your Personal JavaScript Whiteboard

### This is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.

- Click any text cell (including this one) to edit it
- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell.
- You can show any React component, string, number, or anything else by calling the show function. This is a function built into this environment. Call show multiple times to show multiple values
- Re-order or delete cells using the buttons in the top right of each cell
- Add new cells by hovering on the divider between each cell
- This initial welcome configuration will be shown whenever jswb is started without an existing notebook
- Changes are automatically saved to to a file in your current directory by the name of 'notebook.js', or by a name given to the serve command
            `,
          };

          const firstCodeCell = {
            id: '23456',
            type: 'code',
            content: `import { useState } from 'react';

const ClickCounter = (props) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h3>Click Counter</h3>
      <label>{count} </label>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </>
  );
};

show(<ClickCounter />);
          `,
          };

          const secondCodeCell = {
            id: '34567',
            type: 'code',
            content: `const App = () => {
  return (
    <section>
      <h1>Prior cell code can be referenced</h1>
      <ClickCounter />
    </section>
  );
}

show(<App />)
          `,
          };

          const initialCellsString = `[${JSON.stringify(
            firstTextcell
          )}, ${JSON.stringify(firstCodeCell)}, ${JSON.stringify(
            secondCodeCell
          )}]`;

          // File created
          await fs.writeFile(fullPath, initialCellsString, 'utf-8');
          res.send([firstTextcell, firstCodeCell, secondCodeCell]);
        }
      } else {
        throw err;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    // Take list of cells from request obj
    // and serialize them
    const { cells }: { cells: Cell[] } = req.body;
    // Write cells into file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
};
