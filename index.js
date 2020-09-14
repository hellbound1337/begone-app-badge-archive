const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { getModule } = require('powercord/webpack');
const Manager = getModule(['setBadge'], false);

module.exports = class BegoneAppBadge extends Plugin {
   async startPlugin() {
      Manager.setBadge(0);
      inject(
         'bab-icon-badge',
         Manager,
         'setBadge',
         (args) => {
            args[0] = 0;
            return args;
         },
         true
      );

      Manager.setSystemTrayIcon('DEFAULT');
      inject(
         'bab-tray-badge',
         Manager,
         'setSystemTrayIcon',
         (args) => {
            args[0] === 'UNREAD' ? (args[0] = 'DEFAULT') : void 0;
            return args;
         },
         true
      );
   }

   pluginWillUnload() {
      uninject('bab-icon-badge');
      uninject('bab-tray-badge');
   }
};
