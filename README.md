# Cariari Painter 2025

```ascii

                            ░▒▒░        ░░
                         ░░░▒░▒▒▒▒░     ░░░
                       ░░░░▒░░ ▒▒▒▒░▒   ░░░
                    ░░░░░░░       ▒▒░░░░░░░
                 ░▒░░░░     ▒██░    ░░░░░░░
              ░▒▒░▒░░    ▒███████▓▒    ░░ ░░▒░
            ▒▒▒▒▒▒    ░█▓ ░▓▓██▓▒ ▒██░    ░░▒▒▒▒░
          ▒▒▒▒▒░    ▓█▓███▒     ░██████▓░   ░▒▒▒▒▒░
         ░▒▒▒░   ▒███▒    ░▒█ ▒▓▒     ████▒    ▒▒▒░
          ▒▒▒  ░████████▒         ░█████████▒  ▒▒▒░
         ░▒▒▓   ██████████░      ▓██████████▒  ▒▒▓░
          ▓▒▒  ░███████████▒    ████████████▒  ▒▒▒░
         ░▒▒▒   █████████▓       ░██████████▒  ▒▒▒░
          ▒▒▒░ ░███████▓           ▒████████▒  ▒▓▒░
         ░▒▒▒   █████▒    ▓██████    ░██████▒  ▒▒▒░
          ▒▓▒       ░ ░░░░░░░▒░░▒░░▒░░░ ░ ░░   ▒▒▒░
          ▒▒▒░  ▒▓░░░░░░░░░░░░░░░░░░░░░░░░░░   ▒▒▒▒
         ░▒▒▒  ░████████████████████████████░  ▒▒▒▒
          ▒▒▒░ ░████████████2025████████████░  ▒▓▒░
          ▒▓▒░  ░██████████████████████████▒   ▒▒▒
          ░▒▒▒▒            ▓█████            ░▒▒▒▒
           ░▒▒▒▒▒▒░▒░░░░░  ░████▒  ░░▒░░░░░░▒▒▓▒░
              ▒▒▒░▒░░░░░░  ▒████▓  ░▒░░░░░░░▒▒░
                           ▓█████
                           ██████░
                          ░██████▒
                          ███  ▓██
                          ██    ██
                          ░█▒  ░█▒
                            ████░


```

Single page website for an exterior home painting services in Cariari area.

## Tech

- Sveltekit 5
- CSS
- Paraglide
- Nodemailer

## Application Structure

```txt
messages/           # English/Spanish translations
src/
├── components/
│   ├── ui/         # Reusable UI components
│   └── features/   # Feature-specific components
├── routes/         # Svelte pages (file-based routing)
├── lib/            # Utility functions and helpers
├── static/
│   └── assets/     # Static assets like images, fonts
```

## Agent Instructions

- Components are located in src/components and should always be there even when new ones are created
- Utility scrits are located in src/lib with most functions should be in utils.js unless there is a reason why it should be in separate .js file
- All of the assets that are to be used are located in static/assets. global.css should not be used unless styles affect all of the elements/components sitewide. All styles should sit in their individual component files.