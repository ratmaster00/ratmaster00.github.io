# Brainfuck Interpreter

A visual, single-file Brainfuck interpreter built in HTML/CSS/JS. No dependencies, no build step — just open the file in a browser.

## Features

- **Live memory visualization** — 64 cells update in real time as the program runs, with the active cell highlighted in green and non-zero cells in blue
- **Step-through debugging** — execute one instruction at a time and watch the tape change
- **Instruction pointer highlight** — the current instruction is highlighted directly in the editor
- **Adjustable speed** — slow, normal, fast, or instant (synchronous) execution modes
- **ASCII display** — each cell shows its printable character if the value is in range
- **I/O support** — provide input for `,` reads; output appears live below the editor
- **Status bar** — tracks step count, data pointer position, and instruction pointer

## Usage

Open `brainfuck.html` in any modern browser. No server required.

### Controls

| Control | Action |
|---|---|
| **▶ Run** | Start execution. Becomes **⏸ Pause** while running. |
| **Step** | Execute a single instruction. Resets state if starting fresh. |
| **Reset** | Clear tape, output, and all state. |
| **Speed** | Select execution speed (slow / normal / fast / instant). |

### Input

Type ASCII characters into the **in** field before running. Each `,` instruction reads the next character from this buffer (wraps to `0` if exhausted).

### Output

The **out** area displays all `.` writes as they happen.

## Brainfuck Reference

| Instruction | Effect |
|---|---|
| `>` | Move data pointer right |
| `<` | Move data pointer left |
| `+` | Increment current cell (wraps 255 → 0) |
| `-` | Decrement current cell (wraps 0 → 255) |
| `.` | Output current cell as ASCII |
| `,` | Read one character from input into current cell |
| `[` | Jump past matching `]` if current cell is 0 |
| `]` | Jump back to matching `[` if current cell is non-zero |

All other characters are treated as comments and ignored.

## Implementation Details

- **Tape**: 64 cells of `Uint8Array` (values 0–255, wrapping arithmetic)
- **Pointer wrapping**: both data pointer and cell values wrap around
- **Step limit**: instant mode caps at 2,000,000 steps to prevent browser hangs
- **Bracket validation**: unmatched brackets are caught before execution starts, with an error shown in the status bar

## Hello World

The interpreter loads with the classic Hello World program pre-filled:

```brainfuck
++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.
```

## License

Do whatever you want with it.
