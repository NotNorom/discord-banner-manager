'use strict'

import Discord from "discord.js";

export default class BannerService {
    async SetBanner(guild: Discord.Guild, banner: string) {
        guild.setBanner(banner);
    }
}