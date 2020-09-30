import Discord from "discord.js";
import BannerSet from "../models/BannerSet.js";
import config from "../config/config.js";
import fsp from "fs/promises"
import path from "path";
import { mapToObj } from "../utils/utils.js";


export class BannerService {
    public activeBannerSets: Discord.Collection<Discord.Snowflake, BannerSet>;
    public availableBannerSets: Discord.Collection<Discord.Snowflake, Discord.Collection<string, BannerSet>>;
    public queuedBannerSets: Discord.Collection<Discord.Snowflake, Discord.Collection<Date, BannerSet>>;

    public constructor() {
        this.activeBannerSets = new Discord.Collection<Discord.Snowflake, BannerSet>();
        this.availableBannerSets = new Discord.Collection<Discord.Snowflake, Discord.Collection<string, BannerSet>>();
        this.queuedBannerSets = new Discord.Collection<Discord.Snowflake, Discord.Collection<Date, BannerSet>>();
        try {
            fsp.mkdir(config.dataFolder);
        } catch (e) {
            console.log(e);
        }
    }

    async GetBanner(guild: Discord.Guild) {
        return guild.iconURL; //icon for testing purposes
    }

    async SetBanner(guild: Discord.Guild, banner: string) {
        await guild.setIcon(banner); //icon for testing purposes
        return this;
    }

    async Create(guild: Discord.Guild, name: string) {
        if (!this.availableBannerSets.has(guild.id)) {
            this.availableBannerSets.set(guild.id, new Discord.Collection<string, BannerSet>());
        }
        if (this.availableBannerSets.get(guild.id).has(name)) {
            throw new Error("Name is already used");
        }
        let bannerset = new BannerSet(name, "static", 0);
        this.availableBannerSets.get(guild.id).set(name, bannerset);
        return this;
    }

    Banners(guild: Discord.Guild) {
        return this.availableBannerSets.get(guild.id)
    }

    async Save(guild: Discord.Guild) {
        const dataPath = path.join(config.dataFolder, guild.id.toString() + ".json");
        const banners = this.availableBannerSets.get(guild.id);
        if (!banners) return;

        try {
            await fsp.writeFile(dataPath, JSON.stringify(mapToObj(banners)), "utf-8");
        } catch (e) {
            console.error(e);
        }
        return this;
    }

    async Load(guild: Discord.Guild) {
        const dataPath = path.join(config.dataFolder, guild.id.toString() + ".json");
        try {
            let file = JSON.parse((await fsp.readFile(dataPath)).toString());
            console.log("LOADED THIS:");
            console.log(file);
        } catch (e) {
            console.error(e);
        }
        return this;
    }
}

export const bannerService = new BannerService();