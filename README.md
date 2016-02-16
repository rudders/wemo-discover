# wemo-discover

Simple application to discover wemo devices on your local network using [node-ssdp](https://github.com/diversario/node-ssdp).

Basic information about the services of each discovered device is displayed.

Pretty much supplied as is.

Some command line options will come along shortly.

# limitations

This module will find a Wemo Link (Bridge) but not it's attached bulbs (at this stage);

# installation and use

    npm install https://github.com/rudders/wemo-discover.git

    cd wemo-discover
    
    node index.js
    
It will continue to search so has to be stopped with `Ctrl-C` or similar.