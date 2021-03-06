# Ruter for Pebble Time

App for Pebble Time watches to access real-time information on Oslo's public transport system (Ruter).

## Disclaimer

This is an open source project and is in no way connected to Ruter AS or any other company.

At the moment it is a way for me to explore the Pebble SDK and its possibilities, whilst aiming to complete enough
features to make this application a great companion for Oslo's commuters.

It is currently under the very early stages of development. If completed and if the experience it provides to users is
satisfactory it will be made available in the Pebble store.

## Folder structure

```
├─ config
│       Configuration page shown inside the Pebble app on the phone
│
└─ src
    |   The actual watch app (written in C)
    │
    └─ js
            The JavaScript app, runs in the phone, sandboxed
```

## TODO

- [ ] Ensure that the search results are in an usable order

## License

The source code is provided under the MIT License. See [the LICENSE file](LICENSE) for details.
