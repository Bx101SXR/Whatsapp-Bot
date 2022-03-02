const {
	WAConnection,
	MessageType,
	Presence,
	Mimetype,
	GroupSettingChange,
	ChatModification,
	mentionedJid
} = require("@adiwajshing/baileys")
const imageToBase64 = require('image-to-base64')
const moment = require("moment-timezone")
const speed = require('performance-now')
const base64Img = require('base64-img')
const imgbb = require('imgbb-uploader')
const brainly = require('brainly-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { exec } = require("child_process")
const fetch = require('node-fetch')
const ms = require('parse-ms')
const crypto = require('crypto')
const axios = require('axios')
const cheerio = require('cheerio')
const FormData = require('form-data')
const toMs = require('ms')
const fs = require("fs")
const { antiSpam } = require('./lib/antispam')
const { fetchJson } = require('./lib/fetcher')
const cron = require('node-cron')
const { nad } = require('./language')
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const a = '```'
const {
	color,
	bgcolor
} = require('./lib/color')
const {
	getBuffer,
	getGroupAdmins,
	getRandom,
	banner,
	start,
	info,
	success,
	close
} = require('./lib/functions')
//Load Json

/*
SETTINGS
*/
botName = "NEKO BOT" // NAMA BOT
ownerName = "anda siapa :v " // NAMA OWNER
vhtear = "nekobotofficial" // https://vhtear.com
xteam = "APIKEY" // https://api.xteam.xyz
prefix = "." // PREFIX / AWAEl
limitawal = "100" // LIMIT USER
memberlimit = "6" // MEMBER LIMIT GROUP
cr = "*NEKOPOI*" // FAKE REPLY
const ownerNumber = ["628815887040@s.whatsapp.net","6282250148813@s.whatsapp.net","19199161047@s.whatsapp.net"]
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:anda siapa :v\n' // NAMA OWNER
            + 'ORG:FUCK BOY;\n' // NAMA BOT
            + 'TEL;type=CELL;type=VOICE;waid=628815887040:+62 881-5887-040\n' // NOMOR OWNER
            + 'END:VCARD'
/*
SETTINGS
*/
const _registered = JSON.parse(fs.readFileSync('./database/registered.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/leveling.json'))
const premium = JSON.parse(fs.readFileSync('./database/premium.json'))
const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
const bad = JSON.parse(fs.readFileSync('./database/bad.json'))
const badword = JSON.parse(fs.readFileSync('./database/badword.json'))
const event = JSON.parse(fs.readFileSync('./database/event.json'))
const ban = JSON.parse(fs.readFileSync('./database/banned.json'))
const _level = JSON.parse(fs.readFileSync('./database/level.json'))
const uang = JSON.parse(fs.readFileSync('./database/uang.json'))
const _limit = JSON.parse(fs.readFileSync('./database/limit.json'))
const audioya = JSON.parse(fs.readFileSync('./media/audio.json'))
const imegya = JSON.parse(fs.readFileSync('./media/image.json'))
const setimker = JSON.parse(fs.readFileSync('./media/stik.json'))
const vidioya = JSON.parse(fs.readFileSync('./media/video.json'))
const afk = JSON.parse(fs.readFileSync('./database/afk.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/nsfw.json'))
//const simi = JSON.parse(fs.readFileSync('./database/simi.json'))
// End Json

        
        cron.schedule('0 0 * * *', () => {
            const reset = []
            _limit = reset
            console.log('Hang tight, it\'s time to reset usage limits...')
            fs.writeFileSync('./database/limit.json', JSON.stringify(_limit))
            console.log('Success!')
        }, {
            scheduled: true,
            timezone: 'Asia/Jakarta'
        })
		
const getLevelingXp = (sender) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].xp
	}
}

      
          


const getLevelingLevel = (sender) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].level
	}
}

const getLevelingId = (sender) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].id
	}
}

const addLevelingXp = (sender, amount) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		_level[position].xp += amount
		fs.writeFileSync('./database/level.json', JSON.stringify(_level))
	}
}

const addLevelingLevel = (sender, amount) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		_level[position].level += amount
		fs.writeFileSync('./database/level.json', JSON.stringify(_level))
	}
}

const addLevelingId = (sender) => {
	const obj = { id: sender, xp: 1, level: 1 }
	_level.push(obj)
	fs.writeFileSync('./database/level.json', JSON.stringify(_level))
}

const getRegisteredRandomId = () => {
	return _registered[Math.floor(Math.random() * _registered.length)].id
}

const addRegisteredUser = (userid, sender, time, serials) => {
	const obj = { id: userid, name: sender, time: time, serial: serials }
	_registered.push(obj)
	fs.writeFileSync('./database/registered.json', JSON.stringify(_registered))
}

const createSerial = (size) => {
	return crypto.randomBytes(size).toString('hex').slice(0, size)
}

const checkRegisteredUser = (sender) => {
	let status = false
	Object.keys(_registered).forEach((i) => {
		if (_registered[i].id === sender) {
			status = true
		}
	})
	return status
}

const addATM = (sender) => {
	const obj = { id: sender, uang: 5 }
	uang.push(obj)
	fs.writeFileSync('./database/uang.json', JSON.stringify(uang))
}

const addKoinUser = (sender, amount) => {
	let position = false
	Object.keys(uang).forEach((i) => {
		if (uang[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		uang[position].uang += amount
		fs.writeFileSync('./database/uang.json', JSON.stringify(uang))
	}
}

const checkATMuser = (sender) => {
	let position = false
	Object.keys(uang).forEach((i) => {
		if (uang[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return uang[position].uang
	}
}

const bayarLimit = (sender, amount) => {
	let position = false
	Object.keys(_limit).forEach((i) => {
		if (_limit[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		_limit[position].limit -= amount
		fs.writeFileSync('./database/limit.json', JSON.stringify(_limit))
	}
}

const confirmATM = (sender, amount) => {
	let position = false
	Object.keys(uang).forEach((i) => {
		if (uang[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		uang[position].uang -= amount
		fs.writeFileSync('./database/uang.json', JSON.stringify(uang))
	}
}

const limitAdd = (sender) => {
	let position = false
	Object.keys(_limit).forEach((i) => {
		if (_limit[i].id == sender) {
			position = i
		}
	})
	if (position !== false) {
		_limit[position].limit += 1
		fs.writeFileSync('./database/limit.json', JSON.stringify(_limit))
	}
}

function kyun(seconds) {
	function pad(s) {
		return (s < 10 ? '0' : '') + s;
	}
	var hours = Math.floor(seconds / (60 * 60));
	var minutes = Math.floor(seconds % (60 * 60) / 60);
	var seconds = Math.floor(seconds % 60);
	return `${pad(hours)} H ${pad(minutes)} M ${pad(seconds)} S`
}
// SLEEP 
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function starts() {
	const neko = new WAConnection()
	neko.logger.level = 'warn'
	console.log(banner.string)
	neko.on('qr', () => {
		console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color('Scan BosQue'))
	})
	neko.on('credentials-updated', () => {
		fs.writeFileSync('./neko.json', JSON.stringify(neko.base64EncodedAuthInfo(), null, '\t'))
		info('2', 'Login Ke Hati Dia')
	})
	fs.existsSync('./neko.json') && neko.loadAuthInfo('./neko.json')
	neko.on('connecting', () => {
		start('2', 'Sedang Masuk...')
	})
	neko.on('open', () => {
		success('2', 'Berhasil Masuk')
	})
	await neko.connect({ timeoutMs: 0 * 0 })

	  ikyy.on('group-participants-update', async(chat) => {
       if (!welkom.includes(chat.jid)) return
	   try {
            mem = chat.participants[0]
            try {
                var pp_user = await neko.getProfilePicture(mem)
            } catch (e) {
                var pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            try {
                var pp_group = await neko.getProfilePicture(chat.jid)
            } catch (e) {
                var pp_group = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (chat.action == 'add') {
                num = chat.participants[0]
                group_info = await neko.groupMetadata(chat.jid)
                ini_img = await getBuffer(`http://api.lolhuman.xyz/api/base/welcome?apikey=NEKOBOT&img1=${pp_user}&img2=${pp_group}&background=https://telegra.ph/file/e9e111de177581be079ba.jpg&username=@${num.split('@')[0]}&member=${group_info.participants.length}&groupname= ${group_info.subject}`)
                welkam = `@${num.split('@')[0]}, Welkam to ${group_info.subject}`
                await neko.sendMessage(chat.jid, ini_img, MessageType.image, { caption: welkam, contextInfo: { "mentionedJid": [num] } })
            }
			            if (chat.action == 'remove') {
				num = chat.participants[0]
                group_info = await neko.groupMetadata(chat.jid)
                ini_img = await getBuffer(`http://api.lolhuman.xyz/api/base/leave?apikey=NEKOBOT&img1=${pp_user}&img2=${pp_group}&background=https://telegra.ph/file/e9e111de177581be079ba.jpg&username=${num.split('@')[0]}&member=${group_info.participants.length}&groupname= ${group_info.subject}`)
                welkam = `@${num.split('@')[0]}, GOD BYE NGNTOD `
                await neko.sendMessage(chat.jid, ini_img, MessageType.image, { caption: welkam, contextInfo: { "mentionedJid": [num] } })
            }
            } catch (e) {
            console.log('Error :', e)
        }
    })

            
	
neko.on('CB:action,,call', async json => {
    const callerId = json[2][0][1].from;
    console.log("call dari "+ callerId)
        neko.sendMessage(callerId, "Auto block system, dont call please", MessageType.text)
        await sleep(10)
        await neko.blockUser(callerId, "add") // Block user
})
	neko.on('chat-update', async(El) => {
        try {
            if (!El.hasNewMessage) return
            El = JSON.parse(JSON.stringify(El)).messages[0]
            if (!El.message) return
            if (El.key && El.key.remoteJid == 'status@broadcast') return
            if (El.key.fromMe) return
            global.prefix
			global.blocked
			El.message = (Object.keys(El.message)[0] === 'ephemeralMessage') ? El.message.ephemeralMessage.message : El.message
			const content = JSON.stringify(El.message)
			const from = El.key.remoteJid
			const type = Object.keys(El.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const date = new Date().toLocaleDateString()
			body = (type === 'conversation' && El.message.conversation.startsWith(prefix)) ? El.message.conversation : (type == 'imageMessage') && El.message.imageMessage.caption.startsWith(prefix) ? El.message.imageMessage.caption : (type == 'videoMessage') && El.message.videoMessage.caption.startsWith(prefix) ? El.message.videoMessage.caption : (type == 'extendedTextMessage') && El.message.extendedTextMessage.text.startsWith(prefix) ? El.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? El.message.conversation : (type === 'extendedTextMessage') ? El.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && El.message.conversation) ? El.message.conversation : (type == 'imageMessage') && El.message.imageMessage.caption ? El.message.imageMessage.caption : (type == 'videoMessage') && El.message.videoMessage.caption ? El.message.videoMessage.caption : (type == 'extendedTextMessage') && El.message.extendedTextMessage.text ? El.message.extendedTextMessage.text : ''
			const mesejAnti = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			const tescuk = ["0@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const q = args.join(' ')
			const botNumber = neko.user.jid
			
			const totalchat = await neko.chats.all()
			const sender = isGroup ? El.participant : El.key.remoteJid
			pushname = neko.contacts[sender] != undefined ? neko.contacts[sender].vname || neko.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await neko.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isEventon = isGroup ? event.includes(from) : false
			const isRegistered = checkRegisteredUser(sender)
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isLevelingOn = isGroup ? _leveling.includes(from) : false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isBanned = ban.includes(sender)
			const isPrem = premium.includes(sender) || isOwner
			const isAntiLink = isGroup ? antilink.includes(from) : false
			const isnsfw = isGroup ? nsfw.includes(from) : false
            const isBadWord = isGroup ? badword.includes(from) : false
		//	const issimi = isGroup ? antilink.includes(from) : false
			const Rank = getLevelingLevel(sender)
			const isImage = type === 'imageMessage'
			const isUrl = (url) => {
				return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				neko.sendMessage(from, teks, text, { quoted: El })
			}
			const sendMess = (hehe, teks) => {
				neko.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? neko.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : neko.sendMessage(from, teks.trim(), extendedText, { quoted: El, contextInfo: { "mentionedJid": memberr } })
			}
			const sendImage = (teks) => {
				neko.sendMessage(from, teks, image, { quoted: El })
			}
			const costum = (pesan, tipe, target, target2) => {
				neko.sendMessage(from, pesan, tipe, { quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` } } })
			}
			const sendPtt = (teks) => {
				neko.sendMessage(from, audio, mp3, { quoted: El })
			}
        const fakestatus = (teks) => {
            neko.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
                    },
                    message: {
                        "imageMessage": {
                            "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                            "mimetype": "image/jpeg",
                            "caption": cr,
                            "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                            "fileLength": "28777",
                            "height": 1080,
                            "width": 1079,
                            "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                            "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                            "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                            "mediaKeyTimestamp": "1610993486",
                            "jpegThumbnail": fs.readFileSync('./src/image/thumbnail.jpeg'),
                            "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                        }
                    }
                }
            })
        }
			var prema = 'Free'
			if (isPrem) {
				prema = 'Premium'
			}
			if (isOwner) {
				prema = 'BOSS'
			}
			var role = 'NEWBIE'
			if (Rank <= 3) {
				role = 'Bronze I'
			} else if (Rank <= 5) {
				role = 'Bronze II'
			} else if (Rank <= 7) {
				role = 'Bronze III'
			} else if (Rank <= 9) {
				role = 'Silver I'
			} else if (Rank <= 11) {
				role = 'Silver II'
			} else if (Rank <= 13) {
				role = 'Silver III'
			} else if (Rank <= 16) {
				role = 'Gold I'
			} else if (Rank <= 18) {
				role = 'Gold II'
			} else if (Rank <= 20) {
				role = 'Gold III'
			} else if (Rank <= 22) {
				role = 'Gold IV'
			} else if (Rank <= 25) {
				role = 'Platinum I'
			} else if (Rank <= 27) {
				role = 'Platinum II'
			} else if (Rank <= 29) {
				role = 'Platinum III'
			} else if (Rank <= 31) {
				role = 'Platinum IV'
			} else if (Rank <= 33) {
				role = 'Diamond I'
			} else if (Rank <= 35) {
				role = 'Diamomd II'
			} else if (Rank <= 37) {
				role = 'Diamond III'
			} else if (Rank <= 39) {
				role = 'Diamond IV'
			} else if (Rank <= 45) {
				role = 'Master'
			} else if (Rank <= 100) {
				role = 'Grand Master'
			}

			if (isCmd && antiSpam.isFiltered(from) && !isGroup) {
        console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        return reply(`Jangan spam 1 command/5 detik`)}
        if (isCmd && antiSpam.isFiltered(from) && isGroup) {
        console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
         }
if (isCmd && !isOwner) antiSpam.addFilter(from)        
        
        
			
			if (isGroup && isRegistered && isLevelingOn) {
				const currentLevel = getLevelingLevel(sender)
				const checkId = getLevelingId(sender)
				try {
					if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
					const amountXp = Math.floor(Math.random() * 10) + 500
					const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
					const getLevel = getLevelingLevel(sender)
					addLevelingXp(sender, amountXp)
					if (requiredXp <= getLevelingXp(sender)) {
						addLevelingLevel(sender, 1)
						bayarLimit(sender, 3)
						await reply(nad.levelup(pushname, sender, getLevelingXp, getLevel, getLevelingLevel, role))
					}
				} catch (err) {
					console.error(err)
				}
			}
			const checkLimit = (sender) => {
				let found = false
				for (let lmt of _limit) {
					if (lmt.id === sender) {
						let limitCounts = limitawal - lmt.limit
						if (limitCounts <= 0) return neko.sendMessage(from, `Limit Anda Sudah Habis\nUpgrade Premium Biar Bebas Limit Kak`, text, { quoted: El })
						neko.sendMessage(from, nad.limitcount(isPrem, limitCounts), text, { quoted: El })
						found = true
					}
				}
				if (found === false) {
					let obj = { id: sender, limit: 0 }
					_limit.push(obj)
					fs.writeFileSync('./database/limit.json', JSON.stringify(_limit))
					neko.sendMessage(from, nad.limitcount(isPrem, limitCounts), text, { quoted: El })
				}
			}
			const isLimit = (sender) => {
				let position = false
				for (let i of _limit) {
					if (i.id === sender) {
						let limits = i.limit
						if (limits >= limitawal) {
							position = true
							neko.sendMessage(from, nad.limitend(pushname, prefix), text, { quoted: El })
							return true
						} else {
							_limit
							position = true
							return false
						}
					}
				}
				if (position === false) {
					const obj = { id: sender, limit: 0 }
					_limit.push(obj)
					fs.writeFileSync('./database/limit.json', JSON.stringify(_limit))
					return false
				}
			}
			if (isRegistered) {
				const checkATM = checkATMuser(sender)
				try {
					if (checkATM === undefined) addATM(sender)
					const uangsaku = Math.floor(Math.random() * 10) + 90
					addKoinUser(sender, uangsaku)
				} catch (err) {
					console.error(err)
				}
			}
			const limitAdd = (sender) => {
				if (isOwner && isPrem) { return false; }
				let position = false
				Object.keys(_limit).forEach((i) => {
					if (_limit[i].id == sender) {
						position = i
					}
				})
				if (position !== false) {
					_limit[position].limit += 1
					fs.writeFileSync('./database/limit.json', JSON.stringify(_limit))
				}
			}
			if (isGroup) {
				try {
					const getmemex = groupMembers.length
					if (getmemex <= memberlimit) {
						reply(`maaf kak membernya sedikit, aku gak bisa disini! Minimal member : ${memberlimit}`)
						setTimeout(() => {
							neko.groupLeave(from)
						}, 5000)
						setTimeout(() => {
							neko.updatePresence(from, Presence.composing)
							reply("See you kak")
						}, 4000)
						setTimeout(() => {
							neko.updatePresence(from, Presence.composing)
							reply("Oh iya, jangan lupain aku ya:(")
						}, 3000)
						setTimeout(() => {
							neko.updatePresence(from, Presence.composing)
							reply("Baru undang aku lagi:)")
						}, 2000)
						setTimeout(() => {
							neko.updatePresence(from, Presence.composing)
							reply("Membernya tambahin dulu")
						}, 1000)
						setTimeout(() => {
							neko.updatePresence(from, Presence.composing)
							reply("Aku pamit ya kak:)")
						}, 0)
					}
				} catch (err) { console.error(err) }
			}
				
				for (let kemem of bad) {

				if (budy.includes(kemem)) {

				if (!isGroup) return
				if (!isBadWord) return
				if (isGroupAdmins) return reply('Untung Kau Admin:) Btw Jangan Ngegas Om😘')
				neko.updatePresence(from, Presence.composing)
				var kic = `${sender.split("@")[0]}@s.whatsapp.net`
				reply(`Woyy ${sender.split("@")[0]} Jangan Ngomong Kasar Ngemtod😡`)
				setTimeout(() => {
					neko.groupRemove(from, [kic]).catch((e) => { reply(`BOT HARUS JADI ADMIN`) })
				}, 3000)
				setTimeout(() => {
					neko.updatePresence(from, Presence.composing)
					reply("Babay")
				}, 2000)
				setTimeout(() => {
					neko.updatePresence(from, Presence.composing)
					reply("Siap Siap Di Kick")
				}, 1000)
				setTimeout(() => {
					neko.updatePresence(from, Presence.composing)
					reply("Lu Udah Ngomong Kasar")
				}, 0)
			}
			}
			if (budy.includes("https://chat.whatsapp.com/")) {
				if (!isGroup) return
				if (!isAntiLink) return
				if (isGroupAdmins) return reply('Atasan grup mah bebas yakan:v')
				neko.updatePresence(from, Presence.composing)
				if (budy.includes("#izinbos")) return reply("Iya kak jangan spam ya")
				var kic = `${sender.split("@")[0]}@s.whatsapp.net`
				reply(`Woyy ${sender.split("@")[0]} Gak Boleh Share Link`)
				setTimeout(() => {
					neko.groupRemove(from, [kic]).catch((e) => { reply(`BOT HARUS JADI ADMIN`) })
				}, 3000)
				setTimeout(() => {
					neko.updatePresence(from, Presence.composing)
					reply("Hedsot :v")
				}, 2000)
				setTimeout(() => {
					neko.updatePresence(from, Presence.composing)
					reply("Bismillah")
				}, 1000)
				setTimeout(() => {
					neko.updatePresence(from, Presence.composing)
					reply("Ready?")
				}, 0)
			}
			colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			const isQuotedText = type === 'extendedTextMessage' && content.includes('extendedTextMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m=\x1b[1;37m>', '[\x1b[1;32mNEKOBOT\x1b[1;37m]', time, color(command), 'dari', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m=\x1b[1;37m>', '[\x1b[1;31mANDRE\x1b[1;37m]', time, color('Pesan'), 'dari', color(pushname), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m=\x1b[1;37m>', '[\x1b[1;32mNEKOBOT\x1b[1;37m]', time, color(command), 'dari', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m=\x1b[1;37m>', '[\x1b[1;31mANDRE\x1b[1;37m]', time, color('Pesan'), 'dari', color(pushname), 'in', color(groupName), 'args :', color(args.length))
			switch (command) {
		
 	
				
				case 'owner':
				case 'creator':
					neko.sendMessage(from, { displayname: "Jeff", vcard: vcard }, MessageType.contact, { quoted: El })
					neko.sendMessage(from, 'TUH OWNERKU Y  NGENTOD', MessageType.text, { quoted: El })
					break
case 'getpict':
				case 'getpic':
				case 'getpp':
					if (!isGroup) return reply(mess.only.group)
            mentioned = El.message.extendedTextMessage.contextInfo.mentionedJid[0]
            pictt = await neko.getProfilePicture(mentioned)
            pict = await getBuffer(pictt)
            neko.sendMessage(from, pict, image, {quoted: El})
            break	
				
				case 'donasi':
				case 'donate':
				neko.sendMessage(from, nad.donasi(), text, { quoted: El })
					break
				//case 'ikEl':
				neko.sendMessage(from, nad.ikEl(botName, ownerNumbers, ownerName), text, { quoted: El })
					break
case 'hemkel':
			if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					gatauda = body.slice(7)
					anu = await fetchJson(`https://xptnewapi.000webhostapp.com/newapixptn/katakatahacker.php?apikey=xptn3`, {method: 'get'})
					reply(anu.result)
					break
					if (args.length < 1) return reply('Angkanya?')
anu = await fetchJson(`https://bx-hunter.herokuapp.com/api/calculator?angka=${body.slice(12)}&apikey=ikygans`, {method: 'get'})
teks = `${anu.result}`
reply(teks)
break
		case 'googletxt':
				if (!arg) return reply(from, `Penggunaan ${prefix}googletxt teks`, mek)
				sendMediaURL(from, `https://bx-hunter.herokuapp.com/api/flamingtext/google?text=${arg}&apikey=ikygans`)
				break
				case 'spiderman':
				if (!arg) return reply(from, `Penggunaan ${prefix}sipderman teks`, mek)
				sendMediaURL(from, `https://bx-hunter.herokuapp.com/api/flamingtext/spider?text=${arg}&apikey=ikygans`)
				break
				case 'express':
				if (!arg) return reply(from, `Penggunaan ${prefix}express teks`, mek)
				sendMediaURL(from, `https://bx-hunter.herokuapp.com/api/flamingtext/express?text=${arg}&apikey=ikygans`)
				break
				
					case 'readmore':
			    	case 'more':
			    	const more = String.fromCharCode(8206)
			    	const readmore = more.repeat(4001)
				    if (!c.includes('|')) return  reply(mess.error.api)
                    const text1 = c.substring(0, c.indexOf('|') - 0)
                    const text2 = c.substring(c.lastIndexOf('|') + 1)
                    reply( text1 + readmore + text2)
                    break
				
	case 'sadboy':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					if (!isGroup) return reply(nad.groupo())
			anu = await fetchJson(`https://api.vhtear.com/pinterest?query=anime+sadboy&apikey=nekobotofficial`, {method: 'get'})
					var mi = JSON.parse(JSON.stringify(anu.result));
					var ku =  mi[Math.floor(Math.random() * mi.length)];
					nye = await getBuffer(ku)
					neko.sendMessage(from, nye, image, { caption: 'Anjay SADBOY', quoted: El })
					break
						case 'sadgirl':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					if (!isGroup) return reply(nad.groupo())
			anu = await fetchJson(`https://api.vhtear.com/pinterest?query=anime+sadgirl&apikey=nekobotofficial`, {method: 'get'})
					var mi = JSON.parse(JSON.stringify(anu.result));
					var ku =  mi[Math.floor(Math.random() * mi.length)];
					nye = await getBuffer(ku)
					neko.sendMessage(from, nye, image, { caption: 'Anjay SADGirl', quoted: El })
					break
					case 'badut':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					if (!isGroup) return reply(nad.groupo())
			anu = await fetchJson(`https://api.vhtear.com/pinterest?query=badut&apikey=nekobotofficial`, {method: 'get'})
					var mi = JSON.parse(JSON.stringify(anu.result));
					var ku =  mi[Math.floor(Math.random() * mi.length)];
					nye = await getBuffer(ku)
					neko.sendMessage(from, nye, image, { caption: 'Anjay SADBOY', quoted: El })
					break
   case 'wame':
     	if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					if (!isGroup) return reply(nad.groupo())
          neko.updatePresence(from, Presence.composing)
          options = {
             text: `Link WhatsApp-Mu : *wa.me/${sender.split("@s.whatsapp.net")[0]}*\n*Or*\n*api.whatsapp.com/send?phone=${sender.split("@")[0]}*`,
              contextInfo: {
              mentionedJid: [sender]
                }
                  }
            neko.sendMessage(from, options, text, {quoted: El})
           break
			
			case 'speed':
				case 'ping':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const timestamp = speed();
					const latensi = speed() - timestamp
					fakestatus(`Speed: ${latensi.toFixed(4)} _ms_`)
					break
				case 'runtime':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					runtime = process.uptime()
					runte = `「 *RUNTIME* 」\n${kyun(runtime)}`
					fakestatus(`${runte}`)
					break
					
					case 'info':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					let i = []
				let giid = []
				for (mem of totalchat){
					i.push(mem.jid)
				}
				for (id of i){
					if (id && id.includes('g.us')){
						giid.push(id)
					}
				}
                let timestampi = speed();
				let latensii = speed() - timestampi
                anu = process.uptime()
					mee = neko.user
					ca = totalchat
					ginfo = await getBuffer(mee.imgUrl)
					inponya = `━━ 「 *INFO* 」 ━━
❏ Bot type : NodeJS V14
❏ Name : ${neko.user.name}
❏ Browser : ${neko.browserDescription[1]}
❏ Server : ${neko.browserDescription[0]}
❏ Version : ${neko.browserDescription[2]}
❏ Speed : ${latensii.toFixed(4)} Second
❏ Handphone : Asus ROG Phone 1
❏ Versi WA : ${neko.user.phone.wa_version}
❏ Group Chat : ${giid.length}
❏ Personal Chat : ${totalchat.length - giid.length}
❏ Total Chat : ${totalchat.length}
`
				neko.sendMessage(from, ginfo, image, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "mimetype": "image/jpeg",  "caption": cr,  "jpegThumbnail": fs.readFileSync(`./src/image/thumbnail.jpeg`) } } }, caption: inponya })
				break

			case 'req':
                if (isBanned) return reply('Maaf kamu sudah terbenned!')
                if (!isRegistered) return reply(ind.noregis())
                if (args.length < 1) return reply(`Mau request apa NGENTOT`)
          				
                     const cfrr = body.slice(5)
                      if (cfrr.length > 300) return manik.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', text, {quoted: mek})
                        var tonor = El.participant
                       const ress = `*[REQUEST]*\nNomor : @${tonor.split("@s.whatsapp.net")[0]}\nPesan : ${cfrr}`

                      var options = {
                         text: ress,
                         contextInfo: {mentionedJid: [tonor]},
                     }
                    neko.sendMessage('628815887040@s.whatsapp.net', options, text, {quoted: El})
					neko.sendMessage('6289530480310@s.whatsapp.net', options, text, {quoted: El})
                    reply('REQUEST ANDA TELAH SAMPAI ke owner NEKO, Requests palsu/main2 tidak akan ditanggapi.')
                    break
                     case 'bug':
                if (isBanned) return reply('Maaf kamu sudah terbenned!')
                if (!isRegistered) return reply(ind.noregis())
                if (args.length < 1) return reply(`BUG NYA APA AJG`)
          			
          				const kontil = body.slice(5)
                      if (kontil.length > 300) return manik.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', text, {quoted: mek})
                        var tonmor = El.participant
                       const buseh = `*[BUG REPORT]*\nNomor : @${tonmor.split("@s.whatsapp.net")[0]}\nPesan : ${kontil}`

                      var options = {
                         text: buseh,
                         contextInfo: {mentionedJid: [tonmor]},
                     }
                    neko.sendMessage('628815887040@s.whatsapp.net', options, text, {quoted: El})
					neko.sendMessage('6289530480310@s.whatsapp.net', options, text, {quoted: El})
                    reply('LAPORAN ANDA TELAH SAMPAI ke owner NEKO, Laporan palsu/main2 tidak akan ditanggapi.')
                    break
				case 'help':
				case 'menu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					var num = El.participant
				me = neko.user
					const reqXp = 5000 * (Math.pow(2, getLevelingLevel(sender)) - 1)
					const uangku = checkATMuser(sender)
				    const tagg = `@${num.split("@s.whatsapp.net")[0]}`
					const lvl = getLevelingLevel(sender)
				//	const ramadhan = await axios.get('https://xinzbot-api.herokuapp.com/api/hitungmundur?apikey=XinzBot&tanggal=12&buEl=4')
					//const ucapan = await axios.get('https://xinzbot-api.herokuapp.com/api/ucapan?apikey=XinzBot&timeZone=Asia/Jakarta')
					gmenu = await getBuffer(me.imgUrl)
					const menunya = `


╔══✪〘 NEKO 〙✪══
║ 
║
╠➥Nama : ${pushname}
╠➥Tag  :  ${tagg}
╠➥User : ${prema}
╠➥Uang : ${uangku}
╠➥Xp : ${reqXp}
╠➥Rank : ${role}
╠➥Level : ${lvl}
║
╠══✪〘 INFO BOT 〙✪══
╠➥Nama : ${botName}
╠➥Owner : ${ownerName}
╠➥Prefix : 「 ${prefix} 」
╠➥Total Register : ${_registered.length}
╠➥User Premium : ${premium.length}
╠➥.nekogroup
║
╠══✪〘 OWNER MENU 〙✪══
║
╠➥ ${prefix}addprem
╠➥ ${prefix}dellprem
╠➥ ${prefix}ban
╠➥ ${prefix}unban
╠➥ ${prefix}addbadword
╠➥ ${prefix}delbadword
╠➥ ${prefix}badwordlist
╠➥ ${prefix}bc
╠➥ ${prefix}setreply
╠➥ ${prefix}setprefix
╠➥ ${prefix}setbio
╠➥ ${prefix}setppbot
╠➥ ${prefix}setthumb
╠➥ ${prefix}clearall
╠➥ ${prefix}resetlimit
╠➥ ${prefix}event
╠➥ ${prefix}term
╠➥ ${prefix}return
║
╠══✪〘 REQ&BUG MENU 〙✪══
║
╠➥ ${prefix}req(req apa tod)
╠➥ ${prefix}bug(bug nya apaan tod) 
║
╠══✪〘 VN MENU 〙✪══
║
╠➥ iri
╠➥ pale
╠➥ pota
╠➥ welot
╠➥ alay
╠➥ bernyanyi
╠➥ bwa
╠➥ ganteng
╠➥ gatal
╠➥ ladida
╠➥ rusher
╠➥ boong
╠➥ tengteng
╠➥ sound1
╠➥ sound2
╠➥ sound3
╠➥ sound4
╠➥ sound5
╠➥ sound6
╠➥ sound7
║
╠══✪〘 STALK MENU 〙✪══
║
╠➥ ${prefix}stalkig
╠➥ ${prefix}stalkgithub
╠➥ ${prefix}stalktwitter
╠➥ ${prefix}stalktiktok
║
╠══✪〘 INFO MENU 〙✪══
║
╠➥ ${prefix}kbbi
╠➥ ${prefix}brainly2
╠➥ ${prefix}jarak
╠➥ ${prefix}urbandictionary
╠➥ ${prefix}jadwaltv channel
╠➥ ${prefix}jadwaltvnow
╠➥ ${prefix}jadwalbola
╠➥ ${prefix}qrreader
╠➥ ${prefix}heroml hero_name
╠➥ ${prefix}mlstalk id/server
╠➥ ${prefix}genshin character
╠➥ ${prefix}wikipedia query
╠➥ ${prefix}translate kode_negara text
╠➥ ${prefix}brainly query
╠➥ ${prefix}newsinfo
╠➥ ${prefix}cnnindonesia
╠➥ ${prefix}cnnnasional
╠➥ ${prefix}cnninternasional
╠➥ ${prefix}infogempa
╠➥ ${prefix}lirik query
╠➥ ${prefix}cuaca daerah
╠➥ ${prefix}kodepos query
╠➥ ${prefix}indbeasiswa
╠➥ ${prefix}hoax
╠➥ ${prefix}lacakip
╠➥ ${prefix}brainly
╠➥ ${prefix}wiki
╠➥ ${prefix}kbbi
╠➥ ${prefix}covid
╠➥ ${prefix}pinterest
╠➥ ${prefix}ytsearch
╠➥ ${prefix}covidglobal
╠➥ ${prefix}spamsms
║
╠══✪〘 MOVIE&STORY MENU 〙✪══
║
╠➥ ${prefix}drakorongoing
╠➥ ${prefix}lk21 query
╠➥ ${prefix}wattpad url_wattpad
╠➥ ${prefix}wattpadsearch query
╠➥ ${prefix}cerpen
╠➥ ${prefix}ceritahoror
║
╠══✪〘 CREATOR MENU 〙✪══
║
╠➥ ${prefix}ttp text
╠➥ ${prefix}ttp2 text
╠➥ ${prefix}ttp3 text
╠➥ ${prefix}ttp4 text
╠➥ ${prefix}attp text
╠➥ ${prefix}smoji emoji
╠➥ ${prefix}fakedonald text
╠➥ ${prefix}ktpmaker
║
╠══✪〘 GROUP MENU 〙✪══
║
╠➥ ${prefix}welcome
╠➥ ${prefix}leveling
╠➥ ${prefix}Nsfw
╠➥ ${prefix}antilink
╠➥ ${prefix}antibadword
╠➥ ${prefix}group
╠➥ ${prefix}admin
╠➥ ${prefix}add
╠➥ ${prefix}kick
╠➥ ${prefix}hidetag
╠➥ ${prefix}hidetag20
╠➥ ${prefix}level
╠➥ ${prefix}linkgroup
╠➥ ${prefix}tagall
╠➥ ${prefix}setname
╠➥ ${prefix}setdesc
╠➥ ${prefix}demote
╠➥ ${prefix}promote
╠➥ ${prefix}hedsot
╠➥ ${prefix}fitnah
╠➥ ${prefix}jadian
╠➥ ${prefix}leave
╠➥ ${prefix}delete
╠➥ ${prefix}mining
║
╠══✪〘 DOWNLOAD MENU 〙✪══
║
╠➥ ${prefix}pixiv
╠➥ ${prefix}zippypdf
╠➥ ${prefix}zippymp4
╠➥ ${prefix}ytsearch query
╠➥ ${prefix}ytplay query
╠➥ ${prefix}ytmp3 url_video
╠➥ ${prefix}ytmp4 url_video
╠➥ ${prefix}tiktoknowm url_video
╠➥ ${prefix}tiktokmusic url_video
╠➥ ${prefix}igdl url_post
╠➥ ${prefix}twtdl url_post
╠➥ ${prefix}fbdl url_video
╠➥ ${prefix}jooxplay query
╠➥ ${prefix}spotify url_music
╠➥ ${prefix}spotifysearch query
╠➥ ${prefix}pinterest query
╠➥ ${prefix}telesticker url_pack
╠➥ ${prefix}findsticker
║
╠══✪〘 MAKER MENU 〙✪══
║
╠➥ ${prefix}quotemaker
╠➥ ${prefix}comictext
╠➥ ${prefix}hekerlogo
╠➥ ${prefix}graffiti
╠➥ ${prefix}glowtext
╠➥ ${prefix}covertext
╠➥ ${prefix}narutotext
╠➥ ${prefix}erodedtext
╠➥ ${prefix}walltext
╠➥ ${prefix}vietteltext
╠➥ ${prefix}wingstext
╠➥ ${prefix}halloween
╠➥ ${prefix}graffiti2
╠➥ ${prefix}graffiti3
╠➥ ${prefix}foiltext
╠➥ ${prefix}bloodtext
╠➥ ${prefix}hekertext
╠➥ ${prefix}bokehtext
╠➥ ${prefix}carbontext
╠➥ ${prefix}avengerstext
╠➥ ${prefix}watertext
╠➥ ${prefix}firetext
╠➥ ${prefix}metaltext
╠➥ ${prefix}ballontext
╠➥ ${prefix}gemboktext
╠➥ ${prefix}bannerff
╠➥ ${prefix}aloklogo
╠➥ ${prefix}miyalogo
╠➥ ${prefix}gamelogo
╠➥ ${prefix}blackpink
╠➥ ${prefix}thundername
╠➥ ${prefix}silktext
╠➥ ${prefix}partytext
╠➥ ${prefix}romancetext
╠➥ ${prefix}googletext
╠➥ ${prefix}glowtext2
╠➥ ${prefix}lovemessage
╠➥ ${prefix}glitchtext
╠➥ ${prefix}galaxytext
╠➥ ${prefix}pornhub
╠➥ ${prefix}hartatahta
╠➥ ${prefix}wetglass
╠➥ ${prefix}stylelogo
╠➥ ${prefix}watercolor
╠➥ ${prefix}qrcode
╠➥ ${prefix}barcode
╠➥ ${prefix}naruto
╠➥ ${prefix}breakwall
╠➥ ${prefix}matrix
╠➥ ${prefix}blueneon
╠➥ ${prefix}crosslogo
╠➥ ${prefix}flowertext
╠➥ ${prefix}wolflogo
╠➥ ${prefix}dropwater
╠➥ ${prefix}greenneon 
╠➥ ${prefix}crosslogo
╠➥ ${prefix}slapimage
╠➥ ${prefix}phkomen
╠➥ ${prefix}emoji
╠➥ ${prefix}silktext
╠➥ ${prefix}flametext
╠➥ ${prefix}retrotext
╠➥ ${prefix}lighttext 
╠➥ ${prefix}cslogo
╠➥ ${prefix}skytext
╠➥ ${prefix}pubglogo
╠➥ ${prefix}smoketext
╠➥ ${prefix}glowtext
╠➥ ${prefix}glitchtext
╠➥ ${prefix}textlight
╠➥ ${prefix}leavestext 
╠➥ ${prefix}bplogo
╠➥ ${prefix}phlogo
╠➥ ${prefix}text3d
╠➥ ${prefix}text3dbox
╠➥ ${prefix}splaybutton
╠➥ ${prefix}gplaybutton
╠➥ ${prefix}epep
╠➥ ${prefix}sandwrite 
╠➥ ${prefix}firework
╠➥ ${prefix}watercolor
╠➥ ${prefix}snowwrite
╠➥ ${prefix}crismes
╠➥ ${prefix}blackpink text
╠➥ ${prefix}neon text
╠➥ ${prefix}greenneon text
╠➥ ${prefix}advanceglow text
╠➥ ${prefix}futureneon text
╠➥ ${prefix}sandwriting text
╠➥ ${prefix}sandsummer text
╠➥ ${prefix}sandengraved text
╠➥ ${prefix}metaldark text
╠➥ ${prefix}neonlight text
╠➥ ${prefix}holographic text
╠➥ ${prefix}text1917 text
╠➥ ${prefix}minion text
╠➥ ${prefix}deluxesilver text
╠➥ ${prefix}newyearcard text
╠➥ ${prefix}bloodfrosted text
╠➥ ${prefix}halloween text
╠➥ ${prefix}jokerlogo text
╠➥ ${prefix}fireworksparkle text
╠➥ ${prefix}natureleaves text
╠➥ ${prefix}bokeh text
╠➥ ${prefix}toxic text
╠➥ ${prefix}strawberry text
╠➥ ${prefix}box3d text
╠➥ ${prefix}roadwarning text
╠➥ ${prefix}breakwall text
╠➥ ${prefix}icecold text
╠➥ ${prefix}luxury text
╠➥ ${prefix}cloud text
╠➥ ${prefix}summersand text
╠➥ ${prefix}horrorblood text
╠➥ ${prefix}thunder text
╠➥ ${prefix}pornhub text1 text2
╠➥ ${prefix}glitch text1 text2
╠➥ ${prefix}avenger text1 text2
╠➥ ${prefix}space text1 text2
╠➥ ${prefix}ninjalogo text1 text2
╠➥ ${prefix}marvelstudio text1 text2
╠➥ ${prefix}lionlogo text1 text2
╠➥ ${prefix}wolflogo text1 text2
╠➥ ${prefix}steel3d text1 text2
╠➥ ${prefix}wallgravity text1 text2
╠➥ ${prefix}shadow text
╠➥ ${prefix}cup text
╠➥ ${prefix}cup1 text
╠➥ ${prefix}romance text
╠➥ ${prefix}smoke text
╠➥ ${prefix}burnpaper text
╠➥ ${prefix}lovemessage text
╠➥ ${prefix}undergrass text
╠➥ ${prefix}love text
╠➥ ${prefix}coffe text
╠➥ ${prefix}woodheart text
╠➥ ${prefix}woodenboard text
╠➥ ${prefix}summer3d text
╠➥ ${prefix}wolfmetal text
╠➥ ${prefix}nature3d text
╠➥ ${prefix}underwater text
╠➥ ${prefix}golderrose text
╠➥ ${prefix}summernature text
╠➥ ${prefix}letterleaves text
╠➥ ${prefix}glowingneon text
╠➥ ${prefix}fallleaves text
╠➥ ${prefix}flamming text
╠➥ ${prefix}harrypotter text
╠➥ ${prefix}carvedwood text
╠➥ ${prefix}tiktok text1 text2
╠➥ ${prefix}arcade8bit text1 text2
╠➥ ${prefix}battlefield4 text1 text2
╠➥ ${prefix}pubg text1 text2
╠➥ ${prefix}wetglass text
╠➥ ${prefix}multicolor3d text
╠➥ ${prefix}watercolor text
╠➥ ${prefix}luxurygold text
╠➥ ${prefix}galaxywallpaper text
╠➥ ${prefix}lighttext text
╠➥ ${prefix}beautifulflower text
╠➥ ${prefix}puppycute text
╠➥ ${prefix}royaltext text
╠➥ ${prefix}heartshaped text
╠➥ ${prefix}birthdaycake text
╠➥ ${prefix}galaxystyle text
╠➥ ${prefix}hologram3d text
╠➥ ${prefix}greenneon text
╠➥ ${prefix}glossychrome text
╠➥ ${prefix}greenbush text
╠➥ ${prefix}metallogo text
╠➥ ${prefix}noeltext text
╠➥ ${prefix}glittergold text
╠➥ ${prefix}textcake text
╠➥ ${prefix}starsnight text
╠➥ ${prefix}wooden3d text
╠➥ ${prefix}textbyname text
╠➥ ${prefix}writegalacy text
╠➥ ${prefix}galaxybat text
╠➥ ${prefix}snow3d text
╠➥ ${prefix}birthdayday text
╠➥ ${prefix}goldplaybutton text
╠➥ ${prefix}silverplaybutton text
╠➥ ${prefix}freefire text
║
╠══✪〘 GABUT MENU 〙✪══
║
╠➥ ${prefix}tebakin
╠➥ ${prefix}caklontong
╠➥ ${prefix}bisakah
╠➥ ${prefix}kapankah
╠➥ ${prefix}apakah
╠➥ ${prefix}rate
╠➥ ${prefix}hobby
╠➥ ${prefix}truth
╠➥ ${prefix}dare
╠➥ ${prefix}cekbapak
╠➥ ${prefix}seberapagay
║
╠══✪〘 MANGA MENU 〙✪══
║
╠➥ ${prefix}wait
╠➥ ${prefix}manga query
╠➥ ${prefix}anime query
╠➥ ${prefix}character query
╠➥ ${prefix}kusonime url_kusonime
╠➥ ${prefix}kusonimesearch query
╠➥ ${prefix}otakudesu url_otakudesu
╠➥ ${prefix}otakudesusearch query
╠➥ ${prefix}nhentai kode_bom
╠➥ ${prefix}nhentaipdf kode_bom
╠➥ ${prefix}nhentaisearch query
╠➥ ${prefix}nekopoi url
╠➥ ${prefix}nekopoisearch query
║
╠══✪〘 NSFW MENU 〙✪══
║
╠➥ ${prefix}xhamster(haram bro)
╠➥ ${prefix}xnxx(haram bro)
╠➥ ${prefix}art
╠➥ ${prefix}bts
╠➥ ${prefix}exo
╠➥ ${prefix}elf
╠➥ ${prefix}Loli
╠➥ ${prefix}neko
╠➥ ${prefix}waifu
╠➥ ${prefix}shota
╠➥ ${prefix}husbu
╠➥ ${prefix}sagiri
╠➥ ${prefix}shinobu
╠➥ ${prefix}megumin
╠➥ ${prefix}wallnime
╠➥ ${prefix}chiisaihentai
╠➥ ${prefix}trap
╠➥ ${prefix}blowjob
╠➥ ${prefix}yaoi
╠➥ ${prefix}ecchi
╠➥ ${prefix}hentai
╠➥ ${prefix}ahegao
╠➥ ${prefix}hoElewd
╠➥ ${prefix}sideoppai
╠➥ ${prefix}animefeets
╠➥ ${prefix}animebooty
╠➥ ${prefix}animethighss
╠➥ ${prefix}hentaiparadise
╠➥ ${prefix}animearmpits
╠➥ ${prefix}hentaifemdom
╠➥ ${prefix}lewdanimegirls
╠➥ ${prefix}biganimetiddies
╠➥ ${prefix}animebellybutton
╠➥ ${prefix}hentai4everyone
╠➥ ${prefix}bj
╠➥ ${prefix}ero
╠➥ ${prefix}cum
╠➥ ${prefix}feet
╠➥ ${prefix}yuri
╠➥ ${prefix}trap
╠➥ ${prefix}lewd
╠➥ ${prefix}feed
╠➥ ${prefix}eron
╠➥ ${prefix}solo
╠➥ ${prefix}gasm
╠➥ ${prefix}poke
╠➥ ${prefix}anal
╠➥ ${prefix}holo
╠➥ ${prefix}tits
╠➥ ${prefix}kuni
╠➥ ${prefix}kiss
╠➥ ${prefix}erok
╠➥ ${prefix}smug
╠➥ ${prefix}baka
╠➥ ${prefix}solog
╠➥ ${prefix}feetg
╠➥ ${prefix}lewdk
╠➥ ${prefix}waifu
╠➥ ${prefix}pussy
╠➥ ${prefix}femdom
╠➥ ${prefix}cuddle
╠➥ ${prefix}hentai
╠➥ ${prefix}eroyuri
╠➥ ${prefix}cum_jpg
╠➥ ${prefix}blowjob
╠➥ ${prefix}erofeet
╠➥ ${prefix}holoero
╠➥ ${prefix}classic
╠➥ ${prefix}erokemo
╠➥ ${prefix}fox_girl
╠➥ ${prefix}futanari
╠➥ ${prefix}lewdkemo
╠➥ ${prefix}wallpaper
╠➥ ${prefix}wallpaper2
╠➥ ${prefix}pussy_jpg
╠➥ ${prefix}kemonomimi
╠➥ ${prefix}nsfw_avatar
╠➥ ${prefix}ngif
╠➥ ${prefix}nsfw_neko_gif
╠➥ ${prefix}random_hentai_gif
╠➥ ${prefix}cecan
╠➥ ${prefix}cogan
╠➥ ${prefix}sagiri
╠➥ ${prefix}megumin
╠➥ ${prefix}waifu
╠➥ ${prefix}neko
╠➥ ${prefix}shinobu$
╠➥ ${prefix}loli
╠➥ ${prefix}gore
╠➥ ${prefix}nekonime
╠➥ ${prefix}darkjokes
╠➥ ${prefix}meme
╠➥ ${prefix}estetik
║
╠══✪〘 DOMPET MENU 〙✪══
║
╠➥ ${prefix}limit
╠➥ ${prefix}transfer
╠➥ ${prefix}atm
╠➥ ${prefix}buylimit
╠➥ ${prefix}premiumlist
║
╠══✪〘 TOOLS MENU 〙✪══
║
╠➥ ${prefix}toimg
╠➥ ${prefix}tomp3
╠➥ ${prefix}nightcore
╠➥ ${prefix}slow
╠➥ ${prefix}tupai
╠➥ ${prefix}blub
╠➥ ${prefix}gemuk
╠➥ ${prefix}ghost
╠➥ ${prefix}bass
╠➥ ${prefix}imgtourl
╠➥ ${prefix}getpic
║
╠══✪〘 MUTUAEl 〙✪══
║
╠➥ ${prefix}mutual
╠➥ ${prefix}next
║
╠══✪〘 STORAGE MENU 〙✪══
║
╠➥ ${prefix}addstiker
╠➥ ${prefix}getstiker
╠➥ ${prefix}liststiker
╠➥ ${prefix}addvideo
╠➥ ${prefix}getvideo
╠➥ ${prefix}listvideo
╠➥ ${prefix}addvn
╠➥ ${prefix}getvn
╠➥ ${prefix}listvn
╠➥ ${prefix}addimage
╠➥ ${prefix}getimage
╠➥ ${prefix}listimage
║
╠══✪〘 INFO BOT MENU 〙✪══
║
╠➥ ${prefix}runtime
╠➥ ${prefix}creator
╠➥ ${prefix}donasi
╠➥ ${prefix}speed
╠➥ ${prefix}info
║
╠══✪〘 THANKS 〙✪══
║
╠➥ NEKO
╠➥ X-FAR
╠➥ Patroikku 
╠➥ RENSS 
║
╚═〘 NEKO BOT 〙
`
  neko.sendMessage(from, gmenu, image, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "mimetype": "image/jpeg",  "caption": cr,  "jpegThumbnail": fs.readFileSync(`./src/image/thumbnail.jpeg`) } } }, caption: menunya, contextInfo: { "mentionedJid": [num] } })
				break
				case 'gore':
                   if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
                    get_data = await fetchJson(`https://api-senku.herokuapp.com/api/randomgore`)
                    get_data = get_data.data
        		   ini_txt = `judul : ${get_data.judul}\n`
                    ini_txt += `views : ${get_data.views}\n`
                    ini_txt += `comment : ${get_data.comment}\n`
                    ini_txt += `Sedang Mengirim Media Video\n`
                    thumb = await getBuffer(get_data.thumb)
                    neko.sendMessage(from, thumb, image, { quoted: El, caption: ini_txt })
                  video = await getbuffer(get_data.link)
				  neko.sendMessage (from, video, '',El) 
                    break
			
		 case 'sticker':
		 case 'stiker':
				case 'stickergif':
				case 'stikergif':
				case 'sgif':
				case 's':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
						const media = await neko.downloadAndSaveMediaMessage(encmedia)

						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								costum('[❗] SEDANG DIPROSES', text, tescuk, cr)
							})
							.on('end', function () {
								console.log('Finish')
								neko.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: El})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && El.message.videoMessage.seconds < 11 || isQuotedVideo && El.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
						const media = await neko.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						costum('[❗] SEDANG DIPROSES', text, tescuk, cr)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`Gagal, pada saat mengkonversi ${tipe} ke stiker`)
							})
							.on('end', function () {
								console.log('Finish')

								neko.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: El})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else {
						reply(`Kirim gambar dengan caption ${prefix}sticker\nDurasi Sticker Video 1-9 Detik`)
					}
					break

				case 'nuliskiri':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teksnya mana kak? Contoh : ${prefix}nuliskiri Noel baik hati`)
					reply('「❗」WAIT BRO GUE NULIS DUMLU YAKAN')
					kir = await getBuffer(`https://api.xteam.xyz/magernulis2?text=${q}&APIKEY=${xteam}`)
					neko.sendMessage(from, kir, image, { quoted: El, caption: 'Nihh kak' })
					break
				case 'nuliskanan':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teksnya mana kak? Contoh : ${prefix}nuliskanan Noel baik hati`)
					reply('「❗」WAIT BRO GUE NULIS DUMLU YAKAN')
					kan = await getBuffer(`https://api.xteam.xyz/magernulis3?text=${q}&APIKEY=${xteam}`)
					neko.sendMessage(from, kan, image, { quoted: El, caption: 'Nihh kak' })
					break
				case 'stalkig':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Masukan username!\nContoh :\n${prefix}stalkig iamNoel_`)
					anu = await fetchJson(`https://api.xteam.xyz/dl/igstalk?nama=${q}&APIKEY=${xteam}`)
					reply('「❗」Sabar Lagi Stalking IG nya kak')
					stig = await getBuffer(anu.result.user.hd_profile_pic_url_info.url)
					abu = anu.result.user
					hasil = `YAHAHA TELAH DI STALK BOS KU UNTUK USERNAME ${q}
◯ Nama : ${abu.full_name}
◯ Followers : ${abu.follower_count}
◯ Following : ${abu.following_count}
◯ Jumlah Post : ${abu.media_count}
◯ Biografi : ${abu.biography}`
					neko.sendMessage(from, stig, image, { quoted: El, caption: hasil })
					break

				case 'tts':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return neko.sendMessage(from, `Kode bahasanya mana kak? contoh : ${prefix}tts id Halo Noel`, text, { quoted: El })
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return neko.sendMessage(from, `Teksnya mana kak | contoh : ${prefix}tts id ah yamate kudasai`, text, { quoted: El })
					var bby = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					bby.length > 300
						? reply('Teks nya terlalu panjang kak')
						: gtts.save(ranm, bby, function () {
							exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
								fs.unlinkSync(ranm)
								buff = fs.readFileSync(rano)
								if (err) return reply(nad.stikga())
								neko.sendMessage(from, buff, audio, { quoted: El, ptt: true })
								fs.unlinkSync(rano)
							})
						})
					break

				case 'ttp2':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}ttp BOT`)
					pngttp = './temp/ttp.png'
					webpng = './temp/ttp.webp'
					fetch(`https://api.areltiyan.xyz/sticker_maker?text=${q}`, { method: 'GET' })
						.then(async res => {
							const ttptxt = await res.json()
							console.log("BERHASIL")
							base64Img.img(ttptxt.base64, 'temp', 'ttp', function (err, filepath) {
								if (err) return console.log(err);
								exec(`ffmpeg -i ${pngttp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${webpng}`, (err) => {
									buffer = fs.readFileSync(webpng)
									neko.sendMessage(from, buffer, sticker)
									fs.unlinkSync(webpng)
									fs.unlinkSync(pngttp)
								})
							})
						});
					break
			//	case 'attp':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}attp BOT`)
					atetepe = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`)
					neko.sendMessage(from, atetepe, sticker, { quoted: El })
					break

case 'join':
            try {
            if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply(mess.Iv)
            hen = args[0]
            if (!q) return fakestatus('Masukan link group')
            var codeInvite = hen.split('https://chat.whatsapp.com/')[1]
            if (!codeInvite) return fakegroup ('pastikan link sudah benar!')
            var response = await neko.acceptInvite(codeInvite)
            fakestatus('SUKSES')
            } catch {
            fakegroup('LINK ERROR!')
            }
            break
					   case 'mediafire':

				if (args.length < 1) return reply('Link Nya Mana? ')

				if(!isUrl(args[0]) && !args[0].includes('mediafire')) return reply('erorr')
				reply(mess.wait)
				teks = args.join(' ')
				res = await mediafireDl(teks)
				result = `*DATA DITEMUKAN*
				
				ㄙJudul : ${res[0].nama}
				ㄙ Link : ${res[0].link}
				ㄙ Size : ${res[0].size}
				
				_Mendownload file..._`
				reply(result)
				sendFileFromUrl(res[0].link, document, {mimetype: res[0].mime, filename: res[0].nama, quoted: El})
				break 
						case 'pixiv':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
                    if (args.length == 0) return reply(`Example: ${prefix + command} loli kawaii`)
                    query = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/pixiv?apikey=NEKOBOT&query=${query}`)
                    neko.sendMessage(from, ini_buffer, image, { quoted: El })
                    break
                case 'zippypdf':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
                           anu = await fetchJson(`http://api.lolhuman.xyz/api/zippyshare?apikey=NEKOBOT&url=${q}`)
					teks = `「 RESULT FOUND 」\n• Title: ${anu.result.name_file}\n_Sabar anjing_`
					buffer = await getBuffer(anu.result.download_url)
					reply(teks)
					neko.sendMessage(from, buffer, document, { quoted: El, mimetype: Mimetype.pdf, filename: `${anu.result.name_file}.pdf` })
					break
					 case 'zippymp4':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
                           anu = await fetchJson(`http://api.lolhuman.xyz/api/zippyshare?apikey=NEKOBOT&url=${q}`)
					teks = `「 RESULT FOUND 」\n• Title: ${anu.result.name_file}\n_Sabar anjing_`
					buffer = await getBuffer(anu.result.download_url)
					reply(teks)
					neko.sendMessage(from, buffer, document, { quoted: El, mimetype: 'video/mp4', filename: `${anu.result.name_file}.mp4` })
					break
				case 'simi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!q) return reply(`Mau Ngapain?\nContoh :\n${prefix}simi halo`)
					 simi = await fetchJson(`http://api.lolhuman.xyz/api/simi?apikey=NEKOBOT&text=${budy}`)
                        reply(simi.result)
					break

				//case 'quotes':
					neko.updatePresence(from, Presence.composing)
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					data = fs.readFileSync('./ANDRE/quote.json');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					randQuote = '' + randKey.quote + '\n\n_By: ' + randKey.by + '_'
					fakestatus(randQuote)
					break
case 'quotemaker':
				case 'bikinquote':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(12)
					var quote = gh.split("&")[0];
					var wm = gh.split("&")[1];
					const pref = `yang mau dijadiin quote apaan, titit?\ncontoh :\n${prefix}bikinquote aku bukan boneka & Kata Noel`
					if (args.length < 1) return reply(pref)
					reply(nad.wait())
					anu = await fetchJson(`https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=random`, { method: 'get' })
					biquote = await getBuffer(anu.result)
					neko.sendMessage(from, biquote, image, { caption: 'Nih kak >_<', quoted: El })
					break
				    case 'afk':
                    alasan = args.join(" ")
                    afk[sender.split('@')[0]] = alasan.toLowerCase()
                    fs.writeFileSync("./database/afk.json", JSON.stringify(afk))
                    ini_txt = "Anda telah afk\n"
                    if (alasan != "") {
                        ini_txt += "Dengan alasan :" + alasan
                    }
                    reply(ini_txt)
                    break
				case 'groupmenu':
				case 'grupmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const menugrup = `「 *GROUP MENU* 」
❏ ${prefix}welcome
❏ ${prefix}leveling
❏ ${prefix}antilink
❏ ${prefix}antibadword
❏ ${prefix}group
❏ ${prefix}admin
❏ ${prefix}add
❏ ${prefix}kick
❏ ${prefix}hidetag
❏ ${prefix}hidetag20
❏ ${prefix}level
❏ ${prefix}linkgroup
❏ ${prefix}tagall
❏ ${prefix}setname
❏ ${prefix}setdesc
❏ ${prefix}demote
❏ ${prefix}promote
❏ ${prefix}hedsot
❏ ${prefix}fitnah
❏ ${prefix}jadian
❏ ${prefix}leave
❏ ${prefix}delete
❏ ${prefix}mining

「 *${botName}* 」`
					fakestatus(menugrup)
					break
                    
			
case 'grouplist':
					if (!isRegistered) return reply(ind.noregis())
		if (isBanned) return reply(ind.baned())
					neko.updatePresence(from, Presence.composing) 
					teks = `\`\`\`Ini adalah list group NEKO :\n\n\`\`\``
					no = 0
					for (let hehehe of groupId) {
						no += 1
						teks += `\`\`\`[${no.toString()}]\`\`\` @${hehehe.split('@')[0]}\n`
					}
					teks += `\n\`\`\`Total grup : ${groupId.length}\`\`\``
					neko.sendMessage(from, teks.trim(), extendedText, {quoted: El})
					break
			case 'tutuptime': //by ★彡Rҽʂƚα~Fʋɳƙყ彡★
              neko.updatePresence(from, Presence.composing) 
		if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
              if (args[1]=="detik") {var timer = args[0]+"000"
				} else if (args[1]=="menit") {var timer = args[0]+"0000"
				} else if (args[1]=="jam") {var timer = args[0]+"00000"
				} else {return reply("*pilih:*\ndetik\nmenit\njam\n\n*contoh*\n10 detik")}
				setTimeout( () => {
					var nomor = El.participant
					const close = {
					text: `Grup ditutup oleh admin @${nomor.split("@s.whatsapp.net")[0]}\nsekarang *hanya admin* yang dapat mengirim pesan`,
					contextInfo: { mentionedJid: [nomor] }
					}
					neko.groupSettingChange (from, GroupSettingChange.messageSend, true);
					reply(close)
				}, timer)
				break
				
					case 'antibadword':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}antilink 1`)
					if (Number(args[0]) === 1) {
						if (isBadWord) return reply('Sudah Aktif Kak')
						badword.push(from)
						fs.writeFileSync('./database/badword.json', JSON.stringify(badword))
						reply('「 SUKSES 」Fitur Anti Badword Diaktifkan')
						rmln.sendMessage(from, `ALLERT!!! Group ini sudah di pasang anti Badword\nJika Kamu Melanggar Maka Akan Saya Tendang`, text)
					} else if (Number(args[0]) === 0) {
						if (!isBadWord) return reply('Sudah Mati Kak')
						var ini = antilink.indexOf(from)
						badword.splice(ini, 1)
						fs.writeFileSync('./database/badword.json', JSON.stringify(badword))
						reply('「 SUKSES 」Fitur Anti Badword Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break

				case 'welcome':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}welcome 1`)
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Sudah Aktif Kak')
						welkom.push(from)
						fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
						reply('「 SUKSES 」Fitur Welcome Diaktifkan')
					} else if (Number(args[0]) === 0) {
						if (!isWelkom) return reply('Sudah Mati Kak')
						welkom.splice(from, 1)
						fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
						reply('「 SUKSES 」Fitur Welcome Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break
				case 'nsfw':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}nsfw 1`)
					if (Number(args[0]) === 1) {
						if (isnsfw) return reply('Sudah Aktif Kak')
						nsfw.push(from)
						fs.writeFileSync('./database/nsfw.json', JSON.stringify(nsfw))
						reply('「 SUKSES 」Fitur NSFW Diaktifkan')
						rmln.sendMessage(from, `ALLERT!!! Group ini sudah di pasang anti link\nJika Kamu Melanggar Maka Akan Saya Tendang`, text)
					} else if (Number(args[0]) === 0) {
						if (!isnsfw) return reply('Sudah Mati Kak')
						var ini = nsfw.indexOf(from)
						nsfw.splice(ini, 1)
						fs.writeFileSync('./database/nsfw.json', JSON.stringify(nsfw))
						reply('「 SUKSES 」Fitur NSFW Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break
					
								//	case 'simi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}simi 1`)
					if (Number(args[0]) === 1) {
						if (isnsfw) return reply('Sudah Aktif Kak')
						simi.push(from)
						fs.writeFileSync('./database/simi.json', JSON.stringify(simi))
						reply('「 SUKSES 」Fitur SIMI Diaktifkan')
						rmln.sendMessage(from, `ALLERT!!! Group ini sudah di pasang anti link\nJika Kamu Melanggar Maka Akan Saya Tendang`, text)
					} else if (Number(args[0]) === 0) {
						if (!isnsfw) return reply('Sudah Mati Kak')
						var ini = simi.indexOf(from)
						simi.splice(ini, 1)
						fs.writeFileSync('./database/simi.json', JSON.stringify(simi))
						reply('「 SUKSES 」Fitur SIMI Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break
				case 'leveling':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}leveling 1`)
					if (Number(args[0]) === 1) {
						if (isLevelingOn) return reply('Sudah Aktif Kak')
						_leveling.push(from)
						fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
						reply('「 SUKSES 」Fitur Level Diaktifkan')
					} else if (Number(args[0]) === 0) {
						_leveling.splice(from, 1)
						fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
						reply('「 SUKSES 」Fitur Level Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break

				case 'antilink':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}antilink 1`)
					if (Number(args[0]) === 1) {
						if (isAntiLink) return reply('Sudah Aktif Kak')
						antilink.push(from)
						fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
						reply('「 SUKSES 」Fitur Anti Link Diaktifkan')
						rmln.sendMessage(from, `ALLERT!!! Group ini sudah di pasang anti link\nJika Kamu Melanggar Maka Akan Saya Tendang`, text)
					} else if (Number(args[0]) === 0) {
						if (!isAntiLink) return reply('Sudah Mati Kak')
						var ini = antilink.indexOf(from)
						antilink.splice(ini, 1)
						fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
						reply('「 SUKSES 」Fitur Anti Link Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break
				
				case 'grup':
				case 'group':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply(`untuk membuka : ${prefix}group buka\nuntuk menutup : ${prefix}group tutup`)
					if (args[0] === 'buka') {
						reply(`Berhasil Membuka group`)
						neko.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
						reply(`Berhasil Menutup Group`)
						neko.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break

			   case 'spamsms':
	                   	if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
                    if (args.length == 0) return reply(`Example: ${prefix + command} 08303030303030`)
                    nomor = args[0]
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam1?apikey=NEKOBOT&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam2?apikey=NEKOBOT&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam3?apikey=NEKOBOT&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam4?apikey=NEKOBOT&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam5?apikey=NEKOBOT&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam6?apikey=NEKOBOT&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam7?apikey=NEKOBOT&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam8?apikey=NEKOBOT&nomor=${nomor}`)
                    reply("Success")
                    break

			case 'nulis':
		if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
                    if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} El Human`)
                    teks = args.join(" ")
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/nulis?apikey=NEKOBOT&text=${teks}`)
                    neko.sendMessage(from, buffer, image, { quoted: El})
                    break
			case 'admin':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					if (!isGroup) return reply(nad.groupo())
					adm = `*ATASAN GROUP* _${groupMetadata.subject}_\n*TOTAL* : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						adm += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(adm, groupAdmins, true)
					break

			//	case 'add':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply('Yang mau di add siapa?')
					if (args[0].startsWith('08')) return reply('Gunakan kode bahasa kak')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						neko.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Anjim yang mau di add di private, dahlah :)')
					}
					break

			
			case 'k':
					if (isBanned) return reply(nad.baned())
					if (!isOwner) return reply(nad.ownerb())
				if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
				if (!isBotGroupAdmins) return reply(nad.badmin())
					if (El.message.extendedTextMessage === undefined || El.message.extendedTextMessage === null) return reply('Reply Chat Target Nya Kak')
					kicknya = El.message.extendedTextMessage.contextInfo.participant
					await neko.groupRemove(from, [kicknya])
					break
					
					case 'a':
					if (isBanned) return reply(nad.baned())
					if (!isOwner) return reply(nad.ownerb())
				if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
				if (!isBotGroupAdmins) return reply(nad.badmin())
					if (El.message.extendedTextMessage === undefined || El.message.extendedTextMessage === null) return reply('Reply Chat Target Nya Kak')
					add = El.message.extendedTextMessage.contextInfo.participant
					await neko.groupAdd(from, [add])
					break
					
					case 'hidetag':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					var value = body.slice(9)
					var group = await neko.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: El
					}
					neko.sendMessage(from, options, text)
					break
				case 'hidetag++':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isOwner) return reply(nad.ownerb())
					var value = body.slice(11)
					var group = await neko.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: El
					}
					neko.sendMessage(from, options, text)
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                 .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
					 .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                 .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
					 .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                 .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
					 .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                 .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
	                .then(() => {neko.sendMessage(from, options, text)})
					
					
					break

				 case 'ssweb':
                    if (args.length == 0) return reply(`Example: ${prefix + command} http://api.lolhuman.xyz`)
                    ini_link = args[0]
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/ssweb?apikey=${Elhuman}&url=${ini_link}`)
                    await neko.sendMessage(from, ini_buffer, image, { quoted: El })
                    break
				case 'level':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isLevelingOn) return reply(nad.lvlnoon())
					if (!isGroup) return reply(nad.groupo())
					const userLevel = getLevelingLevel(sender)
					const userXp = getLevelingXp(sender)
					if (userLevel === undefined && userXp === undefined) return reply(nad.lvlnul())
					const requiredXp = 5000 * (Math.pow(2, userLevel) - 1)
					resul = `┏━━━━━━♡ *LEVEL* ♡━━━━━━━┓\n┃╭───────────────────\n┃│➸ NAMA : ${pushname}\n┃│➸ NOMOR : wa.me/${sender.split("@")[0]}\n┃│➸ XP : ${userXp}/${requiredXp}\n┃│➸ LEVEL : ${userLevel}\n┃╰───────────────────\n┗━━━━━━━━━━━━━━━━━━━━┛`
					neko.sendMessage(from, resul, text, { quoted: El })
						.catch(async (err) => {
							console.error(err)
							await reply(`Error!\n${err}`)
						})
					break

				case 'linkgrup':
				case 'linkgroup':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					if (!isGroup) return reply(nad.groupo())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					linkgc = await neko.groupInviteCode(from)
					yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
					neko.sendMessage(from, yeh, text, { quoted: El })
					break

				case 'tagall':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					members_id = []
					taga = (args.length > 1) ? body.slice(8).trim() : ''
					taga += '\n\n'
					for (let mem of groupMembers) {
						taga += `➸ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(taga, members_id, true)
					break

				case 'setname':
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					neko.groupUpdateSubject(from, `${body.slice(9)}`)
					neko.sendMessage(from, '「 SUKSES 」Mengubah Nama Grup', text, { quoted: El })
					break

				case 'setdesc':
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					neko.groupUpdateDescription(from, `${body.slice(9)}`)
					neko.sendMessage(from, '*「 SUKSES 」Mengubah Desk Grup', text, { quoted: El })
					break

				case 'demote':
				case 'demot':
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (El.message.extendedTextMessage === undefined || El.message.extendedTextMessage === null) return reply('𝗧𝗮𝗴 𝘁𝗮𝗿𝗴𝗲𝘁 𝘆𝗮𝗻𝗴 𝗶𝗻𝗴𝗶𝗻 𝗱𝗶 𝘁𝗲𝗻𝗱𝗮𝗻𝗴!')
					mentioned = El.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						dem = ''
						for (let _ of mentioned) {
							dem += `*jabatan kamu di copot*🏃 :\n`
							dem += `@_.split('@')[0]`
						}
						mentions(dem, mentioned, true)
						neko.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`Yahh @${mentioned[0].split('@')[0]} Jabatan kamu sebagai leluhur di grup telah di copot🏃`, mentioned, true)
						neko.groupDemoteAdmin(from, mentioned)
					}
					break

				case 'promote':
				case 'promot':
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (El.message.extendedTextMessage === undefined || El.message.extendedTextMessage === null) return reply('Tag Orang Nya Kak')
					mentioned = El.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						prom = ''
						for (let _ of mentioned) {
							prom += `Yeee🥳 Kamu naik jabatan >_< :\n`
							prom += `@_.split('@')[0]`
						}
						mentions(prom, mentioned, true)
						neko.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Selamat🥳 @${mentioned[0].split('@')[0]} *anda naik menjadi admin group* >_<`, mentioned, true)
						neko.groupMakeAdmin(from, mentioned)
					}
					break

			//	case 'hedsot':
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (El.message.extendedTextMessage === undefined || El.message.extendedTextMessage === null) return reply('Tag Orang Nya Kak')
					mentioned = El.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						heds = 'Bismillah Hedsot >_< :\n'
						for (let _ of mentioned) {
							heds += `@${_.split('@')[0]}\n`
						}
						mentions(heds, mentioned, true)
						neko.groupRemove(from, mentioned)
						mentions(heds, mentioned, true)
						neko.groupAdd(from, [num])
					} else {
						mentions(`Berhasil Meng hedsot kepala nya  : @${mentioned[0].split('@')[0]}`, mentioned, true)
						neko.groupRemove(from, mentioned)
					}
					break

				case 'fitnah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!isGroup) return reply(nad.groupo())
					if (args.length < 1) return reply(`Gini kak : ${prefix}fitnah [@tag&pesan&balasanbot]\n\nContoh : ${prefix}fitnah @tagmember&hai&hai juga`)
					var gh = body.slice(8)
					mentioned = El.message.extendedTextMessage.contextInfo.mentionedJid
					var replace = gh.split("&")[0];
					var target = gh.split("&")[1];
					var bot = gh.split("&")[2];
					neko.sendMessage(from, `${bot}`, text, { quoted: { key: { fromMe: false, participant: `${mentioned}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` } } })
					break

				case 'jadian':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!isGroup) return reply(nad.groupo())
					jds = []
					var kamu = groupMembers
					var cinta = groupMembers
					var aku = cinta[Math.floor(Math.random() * kamu.length)]
					var cintax = kamu[Math.floor(Math.random() * cinta.length)]
					tejs = `Ciee.. yang lagi jadian\n*@${aku.jid.split('@')[0]}* ♥️ *@${cintax.jid.split('@')[0]}*\nSemoga Elggeng Hii`
					jds.push(aku.jid)
					jds.push(cintax.jid)
					mentions(tejs, jds, true)
					break

				case 'leave':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					setTimeout(() => {
						neko.groupLeave(from)
					}, 2000)
					setTimeout(() => {
						neko.updatePresence(from, Presence.composing)
						if (!isRegistered) return reply(nad.noregis())
						if (isBanned) return reply(nad.baned())
						fakestatus('Aku pamit kak:)')
					}, 0)
					break

			case 'oleave':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isOwner) return reply(nad.ownerb())
					setTimeout(() => {
						neko.groupLeave(from)
					}, 2000)
					setTimeout(() => {
						neko.updatePresence(from, Presence.composing)
						if (!isRegistered) return reply(nad.noregis())
						if (isBanned) return reply(nad.baned())
						fakestatus('Aku pamit kak:)')
					}, 0)
					break

			case 'd':
			case 'del':
				case 'delete':
					if (isBanned) return reply(nad.baned())
					if (!isOwner) return reply(nad.ownerb())
				if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					neko.deleteMessage(from, { id: El.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break

				case 'mining':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!isGroup) return reply(nad.groupo())
					if (!isEventon) return reply(`maaf ${pushname} event mining tidak di aktifkan sama owner ${ownerName}`)
					if (isOwner) {
						const one = 999999999
						addLevelingXp(sender, one)
						addLevelingLevel(sender, 99)
						reply(`karena ${ownerName} baik Bot memberikan ${one}Xp >_<`)
					} else {
						const mining = Math.ceil(Math.random() * 10000)
						addLevelingXp(sender, mining)
						await reply(`*selamat* ${pushname} kamu mendapatkan *${mining}Xp*`)
					}
					break

			/*	case 'downloadmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const donlot = `「 *DOWNLOAD MENU* 」
❏ ${prefix}play
❏ ${prefix}ytmp3
❏ ${prefix}ytmp4
❏ ${prefix}tiktod
❏ ${prefix}igphoto
❏ ${prefix}igvideo
❏ ${prefix}joox

「 *${botName}* 」`
					fakestatus(donlot)
					break

				case 'play':
					if (!q) return reply(`Yang mau di download apaan?\nContoh : ${prefix}play DJ TUMANEDANG`)
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					fakestatus('Lagu Sedang Dicari...')
					anu = await fetchJson(`https://api.xteam.xyz/dl/play?lagu=${q}&APIKEY=${xteam}`)
					infomp3 = `*「❗」Lagu Ditemukan「❗」*
➸ Judul : ${anu.judul}
➸ Size : ${anu.size}
➸ Source : ${anu.source}

[WAIT] Proses Dumlu Yakan`
					pla = await getBuffer(anu.thumbnail)
					play = await getBuffer(anu.url)
					neko.sendMessage(from, pla, image, { quoted: El, caption: infomp3 })
					neko.sendMessage(from, play, audio, { mimetype: 'audio/mp4', quoted: El })
					break

				case 'ytmp3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply('Link Nya Mana Kak')
					if (!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Link Nya Tidak Valid Kak')
					reply(nad.wait())
					anu = await fetchJson(`https://api.xteam.xyz/dl/ytmp3?url=${q}&APIKEY=${xteam}`)
					ingfomp3 = `*「❗」Lagu Ditemukan「❗」*
➸ Judul : ${anu.judul}
➸ Size : ${anu.size}

[WAIT] Proses Dumlu Yakan`
					buff = await getBuffer(anu.thumbnail)
					lamgu = await getBuffer(anu.url)
					neko.sendMessage(from, buff, image, { quoted: El, caption: ingfomp3 })
					neko.sendMessage(from, lamgu, audio, { mimetype: 'audio/mp4', quoted: El })
					break

				case 'ytmp4':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (args.length < 1) return reply('Link Nya Mana Kak')
					if (!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Link Nya Tidak Valid Kak')
					anu = await fetchJson(`https://api.xteam.xyz/dl/ytmp4?url=${q}&APIKEY=${xteam}`)
					reply(nad.wait())
					infomp4 = `*「❗」Video Ditemukan「❗」*
➸ Judul : ${anu.judul}
➸ Size : ${anu.size}

[WAIT] Proses Dumlu Yakan`
					buffe = await getBuffer(anu.thumbnail)
					neko.sendMessage(from, buffe, image, { quoted: El, caption: infomp4 })
					vidio = await getBuffer(anu.url)
					neko.sendMessage(from, vidio, video, { mimetype: 'video/mp4', quoted: El })
					break

				case 'tiktod':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply('Link Nya Mana Kak')
					anu = await fetchJson(`https://api.xteam.xyz/dl/tiktok?url=${q}&APIKEY=${xteam}`)
					reply('[WAIT] Video akan segera dikirim...')
					tik = await getBuffer(anu.server_1)
					neko.sendMessage(from, tik, video, { mimetype: 'video/mp4', quoted: El })
					break
				case 'igphoto':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply('Link Nya Mana Kak')
					anu = await fetchJson(`https://api.xteam.xyz/dl/ig?url=${q}&APIKEY=${xteam}`)
					reply(nad.wait())
					buff = await getBuffer(anu.result.data[0].data)
					neko.sendMessage(from, buff, image, { quoted: El })
					break

				case 'igvideo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (args.length < 1) return reply('Link Nya Mana Kak')
					anu = await fetchJson(`https://api.xteam.xyz/dl/ig?url=${q}&APIKEY=${xteam}`)
					reply(nad.wait())
					buffe = await getBuffer(anu.result.data[0].data)
					neko.sendMessage(from, buffe, video, { mimetype: 'video/mp4', quoted: El })
					break
				case 'joox':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Mau Nyari Apaan?\nContoh :\n${prefix}joox sayang`)
					reply(nad.wait())
					anu = await fetchJson(`https://api.xteam.xyz/dl/jooxdl?lagu=${q}&APIKEY=${xteam}`)
					asu = anu.result
					infojoox = `*「❗」Lagu Ditemukan「❗」*
➸ Judul : ${asu.songname}
➸ Size : ${asu.filesize}
➸ Artis : ${asu.singers}
➸ Album : ${asu.album}

[WAIT] Proses Dumlu Yakan`
					buft = await getBuffer(asu.album_url)
					lakgu = await getBuffer(asu.download_url)
					neko.sendMessage(from, buft, image, { quoted: El, caption: infojoox })
					neko.sendMessage(from, lakgu, audio, { mimetype: 'audio/mp4', quoted: El })
					break */
							if (budy.includes("https://chat.whatsapp.com/")) {
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const Eler = `「 *MAKER MENU* 」
❏ ${prefix}comictext
❏ ${prefix}hekerlogo
❏ ${prefix}graffiti
❏ ${prefix}glowtext
❏ ${prefix}covertext
❏ ${prefix}narutotext
❏ ${prefix}erodedtext
❏ ${prefix}walltext
❏ ${prefix}vietteltext
❏ ${prefix}wingstext
❏ ${prefix}halloween
❏ ${prefix}graffiti2
❏ ${prefix}graffiti3
❏ ${prefix}foiltext
❏ ${prefix}bloodtext
❏ ${prefix}hekertext
❏ ${prefix}bokehtext
❏ ${prefix}carbontext
❏ ${prefix}avengerstext
❏ ${prefix}watertext
❏ ${prefix}firetext
❏ ${prefix}metaltext
❏ ${prefix}ballontext
❏ ${prefix}gemboktext
❏ ${prefix}bannerff
❏ ${prefix}aloklogo
❏ ${prefix}miyalogo
❏ ${prefix}gamelogo
❏ ${prefix}blackpink
❏ ${prefix}thundername
❏ ${prefix}silktext
❏ ${prefix}partytext
❏ ${prefix}romancetext
❏ ${prefix}googletext
❏ ${prefix}glowtext2
❏ ${prefix}lovemessage
❏ ${prefix}glitchtext
❏ ${prefix}galaxytext
❏ ${prefix}pornhub
❏ ${prefix}hartatahta
❏ ${prefix}wetglass
❏ ${prefix}stylelogo
❏ ${prefix}watercolor
❏  ${prefix}qrcode
❏  ${prefix}barcode
❏  ${prefix}naruto
❏  ${prefix}breakwall
❏  ${prefix}matrix
❏  ${prefix}blueneon
❏  ${prefix}crosslogo
❏  ${prefix}flowertext
❏  ${prefix}wolflogo
❏  ${prefix}dropwater
❏  ${prefix}greenneon 
❏  ${prefix}crosslogo
❏  ${prefix}slapimage
❏  ${prefix}phkomen
❏  ${prefix}emoji
❏  ${prefix}silktext
❏  ${prefix}flametext
❏  ${prefix}retrotext
❏  ${prefix}lighttext 
❏  ${prefix}cslogo
❏  ${prefix}skytext
❏  ${prefix}pubglogo
❏  ${prefix}smoketext
❏  ${prefix}glowtext
❏  ${prefix}glitchtext
❏  ${prefix}textlight
❏  ${prefix}leavestext 
❏  ${prefix}bplogo
❏  ${prefix}phlogo
❏  ${prefix}text3d
❏  ${prefix}text3dbox
❏  ${prefix}splaybutton
❏  ${prefix}gplaybutton
❏  ${prefix}epep
❏  ${prefix}sandwrite 
❏  ${prefix}firework
❏  ${prefix}watercolor
❏  ${prefix}snowwrite
❏  ${prefix}crismes

「 *${botName}* 」`
					fakestatus(Eler)
				
							}
			              

						  case 'quotemaker2':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage)) {
                        if (args.length == 0) return reply(`Example: ${prefix + command} El|Human`)
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        file_name = getRandom(".webp")
                        ini_txt = args.join(" ")
                        request({
                            url: `http://api.lolhuman.xyz/api/quotemaker3?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath),
                                "text": ini_txt
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                           neko.sendMessage(from, ini_buff, image, { quoted: El }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'stickerwm':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage)) {
                        if (args.length == 0) return reply(`Example: ${prefix + command} El|Human`)
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        file_name = getRandom(".webp")
                        ini_txt = args.join(" ").split("|")
                        request({
                            url: `http://api.lolhuman.xyz/api/convert/towebpauthor?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath),
                                "package": ini_txt[0],
                                "author": ini_txt[1]
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                           neko.sendMessage(from, ini_buff, sticker, { quoted: El }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'sticker':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia)
                        file_name = getRandom('.webp')
                        request({
                            url: `http://api.lolhuman.xyz/api/convert/towebp?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath)
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                           neko.sendMessage(from, ini_buff, sticker, { quoted: El }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'roundsticker':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia)
                        file_name = getRandom('.webp')
                        request({
                            url: `http://api.lolhuman.xyz/api/convert/towebpwround?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath)
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                           neko.sendMessage(from, ini_buff, sticker, { quoted: El }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'stickernobg':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia)
                        file_name = getRandom('.png')
                        file_name2 = getRandom('.webp')
                        request({
                            url: `http://api.lolhuman.xyz/api/removebg?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath)
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ffmpeg(`./${file_name}`)
                                .input(file_name)
                                .on('error', function(err) {
                                    console.log(err)
                                    fs.unlinkSync(file_name)
                                })
                                .on('end', function() {
                                   neko.sendMessage(from, fs.readFileSync(file_name2), sticker, { quoted: El })
                                    fs.unlinkSync(file_name2)
                                })
                                .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                                .toFormat('webp')
                                .save(file_name2)
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'takestick':
                    if ((isMedia && !El.message.videoMessage || isQuotedSticker)) {
                        if (args.length == 0) return reply(`Example: ${prefix + command} El|Human`)
                        const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        file_name = getRandom(".webp")
                        ini_txt = args.join(" ").split("|")
                        request({
                            url: `http://api.lolhuman.xyz/api/convert/towebpauthor?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath),
                                "package": ini_txt[0],
                                "author": ini_txt[1]
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                           neko.sendMessage(from, ini_buff, sticker, { quoted: El }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Tag sticker yang sudah dikirim`)
                    }
                    break
                case 'ttp':
                case 'ttp2':
                case 'ttp3':
                case 'ttp4':
                case 'attp':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Noel`)
                    ini_txt = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/${command}?apikey=NEKOBOT&text=${ini_txt}`)
                    await neko.sendMessage(from, ini_buffer, sticker, { quoted: El })
                    break
                case 'triggered':
                    ini_url = args[0]
                    ranp = getRandom('.gif')
                    rano = getRandom('.webp')
                    ini_buffer = `http://api.lolhuman.xyz/api/editor/triggered?apikey=NEKOBOT&img=${ini_url}`
                    exec(`wget "${ini_buffer}" -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                        fs.unlinkSync(ranp)
                        buff = fs.readFileSync(rano)
                       neko.sendMessage(from, buff, sticker, { quoted: El }).then(() => {
                            fs.unlinkSync(rano)
                        })
                    })
                    break
                case 'wasted':
                    ini_url = args[0]
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/editor/wasted?apikey=NEKOBOT&img=${ini_url}`)
                    await neko.sendMessage(from, ini_buffer, image, { quoted: El })
                    break
                case 'smoji':
                    if (args.length == 0) return reply(`Example: ${prefix + command} 😭`)
                    emoji = args[0]
                    try {
                        emoji = encodeURI(emoji[0])
                    } catch {
                        emoji = encodeURI(emoji)
                    }
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/smoji/${emoji}?apikey=NEKOBOT`)
                    await neko.sendMessage(from, ini_buffer, sticker, { quoted: El })
                    break
                case 'smoji2':
                    if (args.length == 0) return reply(`Example: ${prefix + command} 😭`)
                    emoji = args[0]
                    try {
                        emoji = encodeURI(emoji[0])
                    } catch {
                        emoji = encodeURI(emoji)
                    }
                    ini_buffer = await fetchJson(`http://api.lolhuman.xyz/api/smoji3/${emoji}?apikey=NEKOBOT`)
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/convert/towebp?apikey=NEKOBOT&img=` + ini_buffer.result.emoji.whatsapp)
                    await neko.sendMessage(from, ini_buffer, sticker, { quoted: El })
                    break
                case 'fakedonald':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Noel`)
                    ini_txt = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/tweettrump?apikey=NEKOBOT&text=${ini_txt}`)
                    await neko.sendMessage(from, ini_buffer, image, { quoted: El })
                    break
                case 'faketoko':
                    await faketoko(teks = "Tahu Bacem", url_image = "https://i.ibb.co/JdfQ73m/photo-2021-02-05-10-13-39.jpg", title = "Noel", code = "IDR", price = 1000000)
                    break
                case 'ktpmaker':
                    if (args.length == 0) return reply(`Usage: ${prefix + command} nik|provinsi|kabupaten|nama|tempat, tanggal lahir|jenis kelamin|janeko|rt/rw|kelurahan|kecamatan|agama|status nikah|pekerjaan|warga negara|berlaku sampai|url_image\n\nExample: ${prefix + command} 456127893132123|bumipertiwi|fatamorgana|Noel|mars, 99-99-9999|belum ditemukan|jl wardoyo|999/999|turese|imtuni|alhamdulillah islam|jomblo kack|mikirin dia|indo ori no kw|hari kiamat|https://i.ibb.co/Xb2pZ88/test.jpg`)
                    get_args = args.join(" ").split("|")
                    nik = get_args[0]
                    prov = get_args[1]
                    kabu = get_args[2]
                    name = get_args[3]
                    ttl = get_args[4]
                    jk = get_args[5]
                    jl = get_args[6]
                    rtrw = get_args[7]
                    lurah = get_args[8]
                    camat = get_args[9]
                    agama = get_args[10]
                    nikah = get_args[11]
                    kerja = get_args[12]
                    warga = get_args[13]
                    until = get_args[14]
                    img = get_args[15]
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/ktpmaker?apikey=NEKOBOT&nik=${nik}&prov=${prov}&kabu=${kabu}&name=${name}&ttl=${ttl}&jk=${jk}&jl=${jl}&rtrw=${rtrw}&lurah=${lurah}&camat=${camat}&agama=${agama}&nikah=${nikah}&kerja=${kerja}&warga=${warga}&until=${until}&img=${img}`)
                    await neko.sendMessage(from, ini_buffer, image, { quoted: El })
                    break

                    // Converter
                case 'togif':
                    if ((isQuotedSticker)) {
                        const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        file_name = getRandom(".mp4")
                        request({
                            url: `http://api.lolhuman.xyz/api/convert/webptomp4?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath),
                            }
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            get_result = JSON.parse(body)
                            getBuffer(get_result.result).then(result => {
                               neko.sendMessage(from, result, video, { mimetype: Mimetype.gif })
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Reply stickernya kawan`)
                    }
                    break
                case 'tomp4':
                    if ((isQuotedSticker)) {
                        const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        file_name = getRandom(".mp4")
                        request({
                            url: `http://api.lolhuman.xyz/api/convert/webptomp4?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath),
                            }
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            get_result = JSON.parse(body)
                            getBuffer(get_result.result).then(result => {
                               neko.sendMessage(from, result, video, { mimetype: Mimetype.mp4 })
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Reply stickernya kawan`)
                    }
                    break

                    // Stalk
                case 'stalkig':
                    if (args.length == 0) return reply(`Example: ${prefix + command} jessnolimit`)
                    username = args[0]
                    ini_result = await fetchJson(`http://api.lolhuman.xyz/api/stalkig/${username}?apikey=NEKOBOT`)
                    ini_result = ini_result.result
                    ini_buffer = await getBuffer(ini_result.photo_profile)
                    ini_txt = `Username : ${ini_result.username}\n`
                    ini_txt += `Full Name : ${ini_result.fullname}\n`
                    ini_txt += `Posts : ${ini_result.posts}\n`
                    ini_txt += `Followers : ${ini_result.followers}\n`
                    ini_txt += `Following : ${ini_result.following}\n`
                    ini_txt += `Bio : ${ini_result.bio}`
                   neko.sendMessage(from, ini_buffer, image, { caption: ini_txt })
                    break
                case 'stalkgithub':
                    if (args.length == 0) return reply(`Example: ${prefix + command} El-Human`)
                    username = args[0]
                    ini_result = await fetchJson(`http://api.lolhuman.xyz/api/github/${username}?apikey=NEKOBOT`)
                    ini_result = ini_result.result
                    ini_buffer = await getBuffer(ini_result.avatar)
                    ini_txt = `Name : ${ini_result.name}\n`
                    ini_txt += `Link : ${ini_result.url}\n`
                    ini_txt += `Public Repo : ${ini_result.public_repos}\n`
                    ini_txt += `Public Gists : ${ini_result.public_gists}\n`
                    ini_txt += `Followers : ${ini_result.followers}\n`
                    ini_txt += `Following : ${ini_result.following}\n`
                    ini_txt += `Bio : ${ini_result.bio}`
                   neko.sendMessage(from, ini_buffer, image, { caption: ini_txt })
                    break
                case 'stalktwitter':
                    if (args.length == 0) return reply(`Example: ${prefix + command} jokowi`)
                    username = args[0]
                    ini_result = await fetchJson(`http://api.lolhuman.xyz/api/twitter/${username}?apikey=NEKOBOT`)
                    ini_result = ini_result.result
                    ini_buffer = await getBuffer(ini_result.profile_picture)
                    ini_txt = `Username : ${ini_result.screen_name}\n`
                    ini_txt += `Name : ${ini_result.name}\n`
                    ini_txt += `Tweet : ${ini_result.tweet}\n`
                    ini_txt += `Joined : ${ini_result.joined}\n`
                    ini_txt += `Followers : ${ini_result.followers}\n`
                    ini_txt += `Following : ${ini_result.following}\n`
                    ini_txt += `Like : ${ini_result.like}\n`
                    ini_txt += `Description : ${ini_result.description}`
                   neko.sendMessage(from, ini_buffer, image, { caption: ini_txt })
                    break
                case 'stalktiktok':
                    if (args.length == 0) return reply(`Example: ${prefix + command} bunekosutena`)
                    stalk_toktok = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/stalktiktok/${stalk_toktok}?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Username : ${get_result.username}\n`
                    ini_txt += `Nickname : ${get_result.nickname}\n`
                    ini_txt += `Followers : ${get_result.followers}\n`
                    ini_txt += `Followings : ${get_result.followings}\n`
                    ini_txt += `Likes : ${get_result.likes}\n`
                    ini_txt += `Video : ${get_result.video}\n`
                    ini_txt += `Bio : ${get_result.bio}\n`
                    pp_tt = await getBuffer(get_result.user_picture)
                    
	case 'ytstalk':
					if (!isRegistered) return reply(ind.noregis())
					ytk = `${body.slice(11)}`
					anu = await fetchJson(`http://api.lolhuman.xyz/api/ytchannel?apikey=NEKOBOT&query=${ytk}`, {method: 'get'})
					cari = '•••••••••••••••••\n'
					for (let search of anu.result) {
						cari += `*Chanel* : ${search.channel_name}\n*Tentang* : ${search.channel_about}\n*Created* : ${search.channel_created}\n*Link* : https://youtu.com/channel/${search.channel_id}\n•••••••••••••••••\n`
					}
					reply(cari.trim())
					break

					case 'quotemaker3':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage)) {
                        if (args.length == 0) return reply(`Example: ${prefix + command} El|Human`)
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        file_name = getRandom(".webp")
                        ini_txt = args.join(" ")
                        request({
                            url: `http://api.lolhuman.xyz/api/quotemaker3?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath),
                                "text": ini_txt
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                           neko.sendMessage(from, ini_buff, image, { quoted: El }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break
               case 'comunism':
	  case 'trigger':
	    case 'rotate':
	      case 'delete':
	        case 'tobecontinue':
	          case 'thuglife':
var imgbb = require('imgbb-uploader')
	if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: El
	  owgi = await neko.downloadAndSaveMediaMessage(ted)
    urlgambar = args[0]
	  anu = await imgbb("3ea1465ef91578a90ee81f7d41c59a1f", owgi)
	  dinhmmp = await getBuffer(`http://zekais-api.herokuapp.com/${command}?url=${anu.display_url}`)
	 neko.sendMessage(from, dinhmmp, image, {quoted:El})
	} else {
	  reply(`reply atau kirim gambar dengan caption ${prefix + command}`)
	}
	break
			   case 'stickerwm':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage)) {
                        if (args.length == 0) return reply(`Example: ${prefix + command} El|Human`)
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        file_name = getRandom(".webp")
                        ini_txt = args.join(" ").split("|")
                        request({
                            url: `http://api.lolhuman.xyz/api/convert/towebpauthor?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath),
                                "package": ini_txt[0],
                                "author": ini_txt[1]
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                           neko.sendMessage(from, ini_buff, sticker, { quoted: El }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'sticker':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia)
                        file_name = getRandom('.webp')
                        request({
                            url: `http://api.lolhuman.xyz/api/convert/towebp?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath)
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                           neko.sendMessage(from, ini_buff, sticker, { quoted: El }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'roundsticker':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia)
                        file_name = getRandom('.webp')
                        request({
                            url: `http://api.lolhuman.xyz/api/convert/towebpwround?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath)
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                           neko.sendMessage(from, ini_buff, sticker, { quoted: El }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'stickernobg':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia)
                        file_name = getRandom('.png')
                        file_name2 = getRandom('.webp')
                        request({
                            url: `http://api.lolhuman.xyz/api/removebg?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath)
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ffmpeg(`./${file_name}`)
                                .input(file_name)
                                .on('error', function(err) {
                                    console.log(err)
                                    fs.unlinkSync(file_name)
                                })
                                .on('end', function() {
                                   neko.sendMessage(from, fs.readFileSync(file_name2), sticker, { quoted: El })
                                    fs.unlinkSync(file_name2)
                                })
                                .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                                .toFormat('webp')
                                .save(file_name2)
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'takestick':
                    if ((isMedia && !El.message.videoMessage || isQuotedSticker)) {
                        if (args.length == 0) return reply(`Example: ${prefix + command} El|Human`)
                        const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        file_name = getRandom(".webp")
                        ini_txt = args.join(" ").split("|")
                        request({
                            url: `http://api.lolhuman.xyz/api/convert/towebpauthor?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath),
                                "package": ini_txt[0],
                                "author": ini_txt[1]
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                           neko.sendMessage(from, ini_buff, sticker, { quoted: El }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Tag sticker yang sudah dikirim`)
                    }
                    break
                case 'ttp':
                case 'ttp2':
                case 'ttp3':
                case 'ttp4':
                case 'attp':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Noel`)
                    ini_txt = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/${command}?apikey=NEKOBOT&text=${ini_txt}`)
                    await neko.sendMessage(from, ini_buffer, sticker, { quoted: El })
                    break
                case 'triggered':
                    ini_url = args[0]
                    ranp = getRandom('.gif')
                    rano = getRandom('.webp')
                    ini_buffer = `http://api.lolhuman.xyz/api/editor/triggered?apikey=NEKOBOT&img=${ini_url}`
                    exec(`wget "${ini_buffer}" -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                        fs.unlinkSync(ranp)
                        buff = fs.readFileSync(rano)
                       neko.sendMessage(from, buff, sticker, { quoted: El }).then(() => {
                            fs.unlinkSync(rano)
                        })
                    })
                    break
                case 'wasted':
                    ini_url = args[0]
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/editor/wasted?apikey=NEKOBOT&img=${ini_url}`)
                    await neko.sendMessage(from, ini_buffer, image, { quoted: El })
                    break
                case 'smoji':
                    if (args.length == 0) return reply(`Example: ${prefix + command} 😭`)
                    emoji = args[0]
                    try {
                        emoji = encodeURI(emoji[0])
                    } catch {
                        emoji = encodeURI(emoji)
                    }
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/smoji/${emoji}?apikey=NEKOBOT`)
                    await neko.sendMessage(from, ini_buffer, sticker, { quoted: El })
                    break
                case 'smoji2':
                    if (args.length == 0) return reply(`Example: ${prefix + command} 😭`)
                    emoji = args[0]
                    try {
                        emoji = encodeURI(emoji[0])
                    } catch {
                        emoji = encodeURI(emoji)
                    }
                    ini_buffer = await fetchJson(`http://api.lolhuman.xyz/api/smoji3/${emoji}?apikey=NEKOBOT`)
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/convert/towebp?apikey=NEKOBOT&img=` + ini_buffer.result.emoji.whatsapp)
                    await neko.sendMessage(from, ini_buffer, sticker, { quoted: El })
                    break
                case 'fakedonald':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Noel`)
                    ini_txt = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/tweettrump?apikey=NEKOBOT&text=${ini_txt}`)
                    await neko.sendMessage(from, ini_buffer, image, { quoted: El })
                    break
                case 'faketoko':
                    await faketoko(teks = "MAKEK DOANG GA DONASI NGENIOD", url_image = "https://i.ibb.co/JdfQ73m/photo-2021-02-05-10-13-39.jpg", title = "NEKO BOT", code = "IDR", price = 5000)
                    break
                case 'ktpmaker':
                    if (args.length == 0) return reply(`Usage: ${prefix + command} nik|provinsi|kabupaten|nama|tempat, tanggal lahir|jenis kelamin|janeko|rt/rw|kelurahan|kecamatan|agama|status nikah|pekerjaan|warga negara|berlaku sampai|url_image\n\nExample: ${prefix + command} 456127893132123|bumipertiwi|fatamorgana|Noel|mars, 99-99-9999|belum ditemukan|jl wardoyo|999/999|turese|imtuni|alhamdulillah islam|jomblo kack|mikirin dia|indo ori no kw|hari kiamat|https://i.ibb.co/Xb2pZ88/test.jpg`)
                    get_args = args.join(" ").split("|")
                    nik = get_args[0]
                    prov = get_args[1]
                    kabu = get_args[2]
                    name = get_args[3]
                    ttl = get_args[4]
                    jk = get_args[5]
                    jl = get_args[6]
                    rtrw = get_args[7]
                    lurah = get_args[8]
                    camat = get_args[9]
                    agama = get_args[10]
                    nikah = get_args[11]
                    kerja = get_args[12]
                    warga = get_args[13]
                    until = get_args[14]
                    img = get_args[15]
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/ktpmaker?apikey=NEKOBOT&nik=${nik}&prov=${prov}&kabu=${kabu}&name=${name}&ttl=${ttl}&jk=${jk}&jl=${jl}&rtrw=${rtrw}&lurah=${lurah}&camat=${camat}&agama=${agama}&nikah=${nikah}&kerja=${kerja}&warga=${warga}&until=${until}&img=${img}`)
                    await neko.sendMessage(from, ini_buffer, image, { quoted: El })
                    break

                    // Converter
                case 'togif':
                    if ((isQuotedSticker)) {
                        const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        file_name = getRandom(".mp4")
                        request({
                            url: `http://api.lolhuman.xyz/api/convert/webptomp4?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath),
                            }
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            get_result = JSON.parse(body)
                            getBuffer(get_result.result).then(result => {
                               neko.sendMessage(from, result, video, { mimetype: Mimetype.gif })
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Reply stickernya kawan`)
                    }
                    break
                case 'tomp4':
                    if ((isQuotedSticker)) {
                        const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        file_name = getRandom(".mp4")
                        request({
                            url: `http://api.lolhuman.xyz/api/convert/webptomp4?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath),
                            }
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            get_result = JSON.parse(body)
                            getBuffer(get_result.result).then(result => {
                               neko.sendMessage(from, result, video, { mimetype: Mimetype.mp4 })
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Reply stickernya kawan`)
                    }
                    break

                    // Stalk
                     case 'semoji':
		if (!isRegistered) return reply(ind.noregis())
                    if (args.length == 0) return reply(`Example: ${prefix + command} 😭`)
                    emoji = args[0]
                    try {
                        emoji = encodeURI(emoji[0])
                    } catch {
                        emoji = encodeURI(emoji)
                    }
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/smoji/${emoji}?apikey=NEKOBOT`)
                    neko.sendMessage(from, ini_buffer, sticker, { quoted: El})
                    break
                
				  case 'stalkig':
                    if (args.length == 0) return reply(`Example: ${prefix + command} jessnolimit`)
                    username = args[0]
                    ini_result = await fetchJson(`http://api.lolhuman.xyz/api/stalkig/${username}?apikey=NEKOBOT`)
                    ini_result = ini_result.result
                    ini_buffer = await getBuffer(ini_result.photo_profile)
                    ini_txt = `Username : ${ini_result.username}\n`
                    ini_txt += `Full Name : ${ini_result.fullname}\n`
                    ini_txt += `Posts : ${ini_result.posts}\n`
                    ini_txt += `Followers : ${ini_result.followers}\n`
                    ini_txt += `Following : ${ini_result.following}\n`
                    ini_txt += `Bio : ${ini_result.bio}`
                    neko.sendMessage(from, ini_buffer, image, { caption: ini_txt })
                    break
                case 'stalkgithub':
                    if (args.length == 0) return reply(`Example: ${prefix + command} El-Human`)
                    username = args[0]
                    ini_result = await fetchJson(`http://api.lolhuman.xyz/api/github/${username}?apikey=NEKOBOT`)
                    ini_result = ini_result.result
                    ini_buffer = await getBuffer(ini_result.avatar)
                    ini_txt = `Name : ${ini_result.name}\n`
                    ini_txt += `Link : ${ini_result.url}\n`
                    ini_txt += `Public Repo : ${ini_result.public_repos}\n`
                    ini_txt += `Public Gists : ${ini_result.public_gists}\n`
                    ini_txt += `Followers : ${ini_result.followers}\n`
                    ini_txt += `Following : ${ini_result.following}\n`
                    ini_txt += `Bio : ${ini_result.bio}`
                    neko.sendMessage(from, ini_buffer, image, { caption: ini_txt })
                    break
                case 'stalktwitter':
                    if (args.length == 0) return reply(`Example: ${prefix + command} jokowi`)
                    username = args[0]
                    ini_result = await fetchJson(`http://api.lolhuman.xyz/api/twitter/${username}?apikey=NEKOBOT`)
                    ini_result = ini_result.result
                    ini_buffer = await getBuffer(ini_result.profile_picture)
                    ini_txt = `Username : ${ini_result.screen_name}\n`
                    ini_txt += `Name : ${ini_result.name}\n`
                    ini_txt += `Tweet : ${ini_result.tweet}\n`
                    ini_txt += `Joined : ${ini_result.joined}\n`
                    ini_txt += `Followers : ${ini_result.followers}\n`
                    ini_txt += `Following : ${ini_result.following}\n`
                    ini_txt += `Like : ${ini_result.like}\n`
                    ini_txt += `Description : ${ini_result.description}`
                    neko.sendMessage(from, ini_buffer, image, { caption: ini_txt })
                    break
                case 'stalktiktok':
                    if (args.length == 0) return reply(`Example: ${prefix + command} bulansutena`)
                    stalk_toktok = args[0]
                    get_result = await fetchJson(`http://Elhuman.herokuapp.com/api/stalktiktok/${stalk_toktok}?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Username : ${get_result.username}\n`
                    ini_txt += `Nickname : ${get_result.nickname}\n`
                    ini_txt += `Followers : ${get_result.followers}\n`
                    ini_txt += `Followings : ${get_result.followings}\n`
                    ini_txt += `Likes : ${get_result.likes}\n`
                    ini_txt += `Video : ${get_result.video}\n`
                    ini_txt += `Bio : ${get_result.bio}\n`
                    pp_tt = await getBuffer(get_result.user_picture)
                    neko.sendMessage(from, pp_tt, image, { quoted: El, caption: ini_txt })
                    break
               

                    // Other
               
                    // Other
                                   case 'ssweb':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://api.lolhuman.xyz`)
                    ini_link = args[0]
                    ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/ssweb?apikey=NEKOBOT&url=${ini_link}`)
                    await lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
                case 'ssweb2':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://api.lolhuman.xyz`)
                    ini_link = args[0]
                    ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/sswebfull?apikey=NEKOBOT&url=${ini_link}`)
                    await lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
                case 'shortlink':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://api.lolhuman.xyz`)
                    ini_link = args[0]
                    ini_buffer = await fetchJson(`https://api.lolhuman.xyz/api/shortlink?apikey=${apikey}&url=${ini_link}`)
                    reply(ini_buffer.result)
                    break
					                case '1977':
                case 'aden':
                case 'brannan':
                case 'brooklyn':
                case 'clarendon':
                case 'gingham':
                case 'hudson':
                case 'inkwell':
                case 'earlybird':
                case 'kelvin':
                case 'lark':
                case 'lofi':
                case 'maven':
                case 'mayfair':
                case 'moon':
                case 'nashville':
                case 'perpetua':
                case 'reyes':
                case 'rise':
                case 'slumber':
                case 'stinson':
                case 'toaster':
                case 'valencia':
                case 'walden':
                case 'willow':
                case 'xpro2':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia)
                        file_name = getRandom('.jpg')
                        request({
                            url: `http://api.lolhuman.xyz/api/filter/${command}?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath)
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                           neko.sendMessage(from, ini_buff, image, { quoted: El }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'pencil':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        filePath = await neko.downloadAndSaveMediaMessage(encmedia)
                        file_name = getRandom('.jpg')
                        request({
                            url: `http://api.lolhuman.xyz/api/editor/pencil?apikey=NEKOBOT`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath)
                            },
                            encoding: "binary"
                        }, async function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                            await neko.sendMessage(from, ini_buff, image, { quoted: El }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
                    }
                    break
                    // Random Image //
                case 'art':
                case 'bts':
                case 'exo':
                case 'elf':
                case 'loli':
                case 'neko':
                case 'waifu':
                case 'shota':
                case 'husbu':
                case 'sagiri':
                case 'shinobu':
                case 'megumin':
                case 'wallnime':
                   	if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
				   getBuffer(`http://api.lolhuman.xyz/api/random/${command}?apikey=NEKOBOT`).then((gambar) => {
                       neko.sendMessage(from, gambar, image, { quoted: El })
                    })
                    break
                case 'chiisaihentai':
                case 'trap':
                case 'blowjob':
                case 'yaoi':
                case 'ecchi':
                case 'hentai':
                case 'ahegao':
                case 'hoElewd':
                case 'sideoppai':
                case 'animefeets':
                case 'animebooty':
                case 'animethighss':
                case 'hentaiparadise':
                case 'animearmpits':
                case 'hentaifemdom':
                case 'lewdanimegirls':
                case 'biganimetiddies':
                case 'animebellybutton':
                case 'hentai4everyone':
                   						if (!isnsfw) return	reply('*NSFW MATI*')		
									//if (isGroup) return reply('Maaf tidak bisa digroup demi kenyamanan bersama, Silahkan private chat bot. TERIMAKASIH')
									if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					//if (!isPrem) return reply(nad.premium(prefix))
				   await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/${command}?apikey=NEKOBOT`).then((gambar) => {
                       neko.sendMessage(from, gambar, image, { quoted: El })
                    })
                    break
                case 'bj':
                case 'ero':
                case 'cum':
                case 'feet':
                case 'yuri':
                case 'trap':
                case 'lewd':
                case 'feed':
                case 'eron':
                case 'solo':
                case 'gasm':
                case 'poke':
                case 'anal':
                case 'holo':
                case 'tits':
                case 'kuni':
                case 'kiss':
                case 'erok':
                case 'smug':
                case 'baka':
                case 'solog':
                case 'feetg':
                case 'lewdk':
                case 'waifu':
                case 'pussy':
                case 'femdom':
                case 'cuddle':
                case 'hentai':
                case 'eroyuri':
                case 'cum_jpg':
                case 'blowjob':
                case 'erofeet':
                case 'holoero':
                case 'classic':
                case 'erokemo':
                case 'fox_girl':
                case 'futanari':
                case 'lewdkemo':
              //  case 'wallpaper':
                case 'pussy_jpg':
                case 'kemonomimi':
                case 'nsfw_avatar':
                  						if (!isnsfw) return	reply('*NSFW MATI*')		
									//if (isGroup) return reply('Maaf tidak bisa digroup demi kenyamanan bersama, Silahkan private chat bot. TERIMAKASIH')
									if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					//if (!isPrem) return reply(nad.premium(prefix)) 
				   getBuffer(`http://api.lolhuman.xyz/api/random2/${command}?apikey=NEKOBOT`).then((gambar) => {
                       neko.sendMessage(from, gambar, image, { quoted: El })
                    })
                    break

                    // Textprome //
                case 'blackpink':
                case 'neon':
                case 'greenneon':
                case 'advanceglow':
                case 'futureneon':
                case 'sandwriting':
                case 'sandsummer':
                case 'sandengraved':
                case 'metaldark':
                case 'neonlight':
                case 'holographic':
                case 'text1917':
                case 'minion':
                case 'deluxesilver':
                case 'newyearcard':
                case 'bloodfrosted':
                case 'halloween':
                case 'jokerlogo':
                case 'fireworksparkle':
                case 'natureleaves':
                case 'bokeh':
                case 'toxic':
                case 'strawberry':
                case 'box3d':
                case 'roadwarning':
                case 'breakwall':
                case 'icecold':
                case 'luxury':
                case 'cloud':
                case 'summersand':
                case 'horrorblood':
                case 'thunder':
                  	if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
				  if (args.length == 0) return reply(`Example: ${prefix + command} Noel`)
                    ini_txt = args.join(" ")
                    getBuffer(`http://api.lolhuman.xyz/api/textprome/${command}?apikey=NEKOBOT&text=${ini_txt}`).then((gambar) => {
                       neko.sendMessage(from, gambar, image, { quoted: El })
                    })
                    break
                case 'pornhub':
                case 'glitch':
                case 'avenger':
                case 'space':
                case 'ninjalogo':
                case 'marvelstudio':
                case 'lionlogo':
                case 'wolflogo':
                case 'steel3d':
                case 'wallgravity':
                 	if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
				 if (args.length == 0) return reply(`Example: ${prefix + command} Noel`)
                    txt1 = args[0]
                    txt2 = args[1]
                    getBuffer(`http://api.lolhuman.xyz/api/textprome2/${command}?apikey=NEKOBOT&text1=${txt1}&text2=${txt2}`).then((gambar) => {
                       neko.sendMessage(from, gambar, image, { quoted: El })
                    })
                    break

                    // Photo Oxy //
                case 'shadow':
                case 'cup':
                case 'cup1':
                case 'romance':
                case 'smoke':
                case 'burnpaper':
                case 'lovemessage':
                case 'undergrass':
                case 'love':
                case 'coffe':
                case 'woodheart':
                case 'woodenboard':
                case 'summer3d':
                case 'wolfmetal':
                case 'nature3d':
                case 'underwater':
                case 'golderrose':
                case 'summernature':
                case 'letterleaves':
                case 'glowingneon':
                case 'fallleaves':
                case 'flamming':
                case 'harrypotter':
                case 'carvedwood':
                 	if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
				 if (args.length == 0) return reply(`Example: ${prefix + command} Noel`)
                    ini_txt = args.join(" ")
                    getBuffer(`http://api.lolhuman.xyz/api/photooxy1/${command}?apikey=NEKOBOT&text=${ini_txt}`).then((gambar) => {
                       neko.sendMessage(from, gambar, image, { quoted: El })
                    })
                    break
                case 'tiktok':
                case 'arcade8bit':
                case 'battlefield4':
                case 'pubg':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Noel`)
                    txt1 = args[0]
                    txt2 = args[1]
                    getBuffer(`http://api.lolhuman.xyz/api/photooxy2/${command}?apikey=NEKOBOT&text1=${txt1}&text2=${txt2}`).then((gambar) => {
                       neko.sendMessage(from, gambar, image, { quoted: El })
                    })
                    break

                    // Ephoto 360 //
                case 'wetglass':
                case 'multicolor3d':
                case 'watercolor':
                case 'luxurygold':
                case 'galaxywallpaper':
                case 'lighttext':
                case 'beautifulflower':
                case 'puppycute':
                case 'royaltext':
                case 'heartshaped':
                case 'birthdaycake':
                case 'galaxystyle':
                case 'hologram3d':
                case 'greenneon':
                case 'glossychrome':
                case 'greenbush':
                case 'metallogo':
                case 'noeltext':
                case 'glittergold':
                case 'textcake':
                case 'starsnight':
                case 'wooden3d':
                case 'textbyname':
                case 'writegalacy':
                case 'galaxybat':
                case 'snow3d':
                case 'birthdayday':
                case 'goldplaybutton':
                case 'silverplaybutton':
                case 'freefire':
                 	if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
				 if (args.length == 0) return reply(`Example: ${prefix + command} Noel`)
                    ini_txt = args.join(" ")
                    getBuffer(`http://api.lolhuman.xyz/api/ephoto1/${command}?apikey=NEKOBOT&text=${ini_txt}`).then((gambar) => {
                       neko.sendMessage(from, gambar, image, { quoted: El })
                    })
                    break
					                case 'nsfwcheck':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
                        var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        var filePath = await neko.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        var form = new FormData();
                        var stats = fs.statSync(filePath);
                        var fileSizeInBytes = stats.size;
                        var fileStream = fs.createReadStream(filePath);
                        form.append('img', fileStream, { knownLength: fileSizeInBytes });
                        var options = {
                            method: 'POST',
                            credentials: 'include',
                            body: form
                        }
                        get_result = await fetchJson(`http://api.lolhuman.xyz/api/nsfwcheck?apikey=NEKOBOT`, {...options })
                        fs.unlinkSync(filePath)
                        get_result = get_result.result
                        is_nsfw = "No"
                        if (Number(get_result.replace("%", "")) >= 50) is_nsfw = "Yes"
                        reply(`Is NSFW? ${is_nsfw}\nNSFW Score : ${get_result}`)
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break
           	 

			
					
                case 'telesticker':
             	if (isBanned) return reply(nad.baned())
					//if (!isPrem) return reply(nad.premium(prefix))
				if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
			 if (args.length == 0) return reply(`Example: ${prefix + command} https://t.me/addstickers/LINE_Menhera_chan_ENG`)
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/telestick?apikey=NEKOBOT&url=${ini_url}`)
                    ini_sticker = ini_url.result.sticker
                    for (sticker_ in ini_sticker) {
                        ini_buffer = await getBuffer(ini_sticker[sticker_])
                        await neko.sendMessage(from, ini_buffer, sticker)
                    }
                    break
                case 'removebg':
	if (!isRegistered) return reply( ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf kamu sudah terbenned!')
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !neko.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(neko).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: neko
	  reply(ind.wait())
	  owgi = await manik.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(7)
	  anu = await imgbb("3ea1465ef91578a90ee81f7d41c59a1f", owgi)
	  hehe = await getBuffer(`http://Elhuman.herokuapp.com/api/removebg?apikey=${Elhumankey}&img=${anu.display_url}`)
	 manik.sendMessage(from, hehe, image, {quoted:El})
	} else {
	  reply('Jangan tambah kan apapun pada command')
	}
	break
	case 'rotate':
	if (!isRegistered) return reply( ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf kamu sudah terbenned!')
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !neko.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(neko).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: neko
	  reply(ind.wait())
	  owgi = await manik.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(7)
	  anu = await imgbb("3ea1465ef91578a90ee81f7d41c59a1f", owgi)
	  hehe = await getBuffer(`http://zekais-api.herokuapp.com/rotate?url=${anu.display_url}`)
	 manik.sendMessage(from, hehe, image, {quoted:El})
	} else {
	  reply('Jangan tambah kan apapun pada command')
	}
	break
	case 'komunis':
	if (!isRegistered) return reply( ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf kamu sudah terbenned!')
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !neko.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(neko).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: neko
	  reply(ind.wait())
	  owgi = await manik.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(7)
	  anu = await imgbb("3ea1465ef91578a90ee81f7d41c59a1f", owgi)
	  hehe = await getBuffer(`http://zekais-api.herokuapp.com/comunism?url=${anu.display_url}`)
	 neko.sendMessage(from, hehe, image, {quoted:El})
	} else {
	  reply('Jangan tambah kan apapun pada command')
	}
	break
	case 'deletepc':
	if (!isRegistered) return reply( ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf kamu sudah terbenned!')
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !neko.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(neko).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: neko
	  reply(ind.wait())
	  owgi = await manik.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(7)
	  anu = await imgbb("3ea1465ef91578a90ee81f7d41c59a1f", owgi)
	  hehe = await getBuffer(`http://zekais-api.herokuapp.com/delete?url=${anu.display_url}`)
	 manik.sendMessage(from, hehe, image, {quoted:El})
	} else {
	  reply('Jangan tambah kan apapun pada command')
	}
	break
				
				
				case 'tiktoknowm':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
                    query = args.join(" ")
                    ini_url = `http://api.lolhuman.xyz/api/tiktok?apikey=NEKOBOT&url=${query}`
                    get_result = await fetchJson(ini_url)
                    ini_buffer = await getBuffer(get_result.result.link)
                    await neko.sendMessage(from, ini_buffer, video, { quoted: El })
                    break
                case 'tiktokmusic':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
                    ini_link = args[0]
                    get_audio = await getBuffer(`http://api.lolhuman.xyz/api/tiktokmusic?apikey=NEKOBOT&url=${ini_link}`)
                    await neko.sendMessage(from, get_audio, audio, { mimetype: Mimetype.mp4Audio, quoted: El })
                    break
                case 'spotify':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://open.spotify.com/track/0ZEYRVISCaqz5yamWZWzaA`)
                    url = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/spotify?apikey=NEKOBOT&url=${url}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Artists : ${get_result.artists}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Popularity : ${get_result.popularity}\n`
                    ini_txt += `Preview : ${get_result.preview_url}\n`
                    thumbnail = await getBuffer(get_result.thumbnail)
                    await neko.sendMessage(from, thumbnail, image, { quoted: El, caption: ini_txt })
                    get_audio = await getBuffer(get_result.link)
                    await neko.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${get_result.title}.mp3`, quoted: El })
                    break
                case 'spotifysearch':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/spotifysearch?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_txt = ""
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Artists : ${x.artists}\n`
                        ini_txt += `Duration : ${x.duration}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Preview : ${x.preview_url}\n\n\n`
                    }
                    reply(ini_txt)
                    break
          case 'ytmp3':
		   case 'play':
		 case 'ytplay':
			if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
				  if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/ytplay2?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_buffer = await getBuffer(get_result.thumbnail)
                    neko.sendMessage(from, ini_buffer, image, { quoted: El, caption: get_result.title })
                    get_audio = await getBuffer(get_result.audio)
                    neko.sendMessage(from, get_audio, audio, { mimetype: Mimetype.mp4Audio, filename: `${get_result.title}.mp3`, quoted: El})
                     break   
			  case 'playvideo':
				 case 'ytplay2':
				 	case 'ytmp4':
			if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
				  if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/ytplay2?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_buffer = await getBuffer(get_result.thumbnail)
                    neko.sendMessage(from, ini_buffer, image, { quoted: El, caption: get_result.title })
                    get_video = await getBuffer(get_result.video)
                    neko.sendMessage(from, get_video, video, { mimetype: Mimetype.mp4, filename: `${get_result.title}.mp4`, quoted: El})
                    break
				  
			 case 'jooxplay':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/jooxplay?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.info.song}\n`
                    ini_txt += `Artists : ${get_result.info.singer}\n`
                    ini_txt += `Duration : ${get_result.info.duration}\n`
                    ini_txt += `Album : ${get_result.info.album}\n`
                    ini_txt += `Uploaded : ${get_result.info.date}\n`
                    ini_txt += `Lirik :\n ${get_result.lirik}\n`
                    thumbnail = await getBuffer(get_result.image)
                    await neko.sendMessage(from, thumbnail, image, { quoted: El, caption: ini_txt })
                    get_audio = await getBuffer(get_result.audio[0].link)
                    await neko.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${get_result.info.song}.mp3`, quoted: El })
                    break
              		case 'asupan':
			if (!isRegistered) return reply(nad.noregis())
			if (!isPrem) return reply(nad.premium(prefix))
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/asupan?apikey=NEKOBOT`)
                    buffer = await getBuffer(get_result.result)
                    neko.sendMessage(from, buffer, video, { quoted: El, mimetype: Mimetype.mp4, filename: "asupan.mp4" })
                    break
			  case 'igdl':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`)
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/instagram?apikey=NEKOBOT&url=${ini_url}`)
                    ini_url = ini_url.result
                    ini_type = image
                    if (ini_url.includes(".mp4")) ini_type = video
                    ini_buffer = await getBuffer(ini_url)
                    await neko.sendMessage(from, ini_buffer, ini_type, { quoted: El })
                    break
     case 'gimage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
                    if (args.length == 0) return reply(`Example: ${prefix + command} loli`)
                    query = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/gimage?apikey=${apikey}&query=${query}`)
                    neko.sendMessage(from, ini_buffer, image, { quoted: El})
                    break
                case 'gimage2':
				if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
                    if (args.length == 0) return reply(`Example: ${prefix + command} loli`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/gimage2?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    for (var x = 0; x <= 5; x++) {
                        var ini_buffer = await getBuffer(get_result[x])
                        neko.sendMessage(from, ini_buffer, image)
                    }
                    break
					  case 'findsticker':
		if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
                    if (args.length == 0) return reply(`Example: ${prefix + command} Koceng Imot`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/stickerwa?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result[0].stickers
                    for (var x of get_result) {
                        ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/convert/towebp?apikey=NEKOBOT&img=${x}`)
                        neko.sendMessage(from, ini_buffer, sticker)
                    }
                    break
                case 'konachan':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
                    if (args.length == 0) return reply(`Example: ${prefix + command} azur_lane`)
                    query = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/konachan?apikey=NEKOBOT&query=${query}`)
                    neko.sendMessage(from, ini_buffer, image, { quoted: El})
                    break
                
			   case 'igdl2':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`)
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/instagram2?apikey=NEKOBOT&url=${ini_url}`)
                    ini_result = ini_url.result.media
                    for (var x of ini_result) {
                        ini_type = image
                        if (x.includes(".mp4")) ini_type = video
                        ini_buffer = await getBuffer(x)
                        await neko.sendMessage(from, ini_buffer, ini_type, { quoted: El })
                    }
                    break
                case 'twtdl':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://twitter.com/gofoodindonesia/status/1229369819511709697`)
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/twitter?apikey=NEKOBOT&url=${ini_url}`)
                    ini_url = ini_url.result
                    ini_url = ini_url[ini_url.length - 1].link
                    ini_buffer = await getBuffer(ini_url)
                    await neko.sendMessage(from, ini_buffer, video, { quoted: El })
                    break
                case 'fbdl':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://id-id.facebook.com/SamsungGulf/videos/video-bokeh/561108457758458/`)
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/facebook?apikey=NEKOBOT&url=${ini_url}`)
                    ini_url = ini_url.result[0].link
                    ini_buffer = await getBuffer(ini_url)
                    await neko.sendMessage(from, ini_buffer, video, { quoted: El })
                    break
               case 'image':
                case 'pinterest':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Loli kawaii`)
                    query = args.join(" ")
                    anu = await fetchJson(`https://api.vhtear.com/pinterest?query=${query}&apikey=nekobotofficial`, {method: 'get'})
					var mi = JSON.parse(JSON.stringify(anu.result));
					var ku =  mi[Math.floor(Math.random() * mi.length)];
					nye = await getBuffer(ku)
					neko.sendMessage(from, nye, image, { caption: 'Anjay Ganteng', quoted: El })
					break
                case 'pinterest2':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Loli kawaii`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/pinterest2?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    for (var x = 0; x <= 5; x++) {
                        var ini_buffer = await getBuffer(get_result[x])
                        await neko.sendMessage(from, ini_buffer, image)
                    }
                    break
					                case 'xhamstersearch':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Japanese`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/xhamstersearch?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_txt = ""
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Views : ${x.views}\n`
                        ini_txt += `Duration : ${x.duration}\n`
                        ini_txt += `Link : ${x.link}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'xhamster':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://xhamster.com/videos/party-with-friends-end-in-awesome-fucking-5798407`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/xhamster?apikey=NEKOBOT&url=${query}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Uploader : ${get_result.author}\n`
                    ini_txt += `Upload : ${get_result.upload}\n`
                    ini_txt += `View : ${get_result.views}\n`
                    ini_txt += `Rating : ${get_result.rating}\n`
                    ini_txt += `Like : ${get_result.likes}\n`
                    ini_txt += `Dislike : ${get_result.dislikes}\n`
                    ini_txt += `Comment : ${get_result.comments}\n`
                    ini_txt += "Link : \n"
                    link = get_result.link
                    for (var x of link) {
                        ini_txt += `${x.type} - ${x.link}\n\n`
                    }
                    thumbnail = await getBuffer(get_result.thumbnail)
                    await neko.sendMessage(from, thumbnail, image, { quoted: El, caption: ini_txt })
                    break
                case 'xnxxsearch':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Japanese`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/xnxxsearch?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_txt = ""
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Views : ${x.views}\n`
                        ini_txt += `Duration : ${x.duration}\n`
                        ini_txt += `Uploader : ${x.uploader}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Thumbnail : ${x.thumbnail}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'xnxx':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://www.xnxx.com/video-uy5a73b/mom_is_horny_-_brooklyn`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/xnxx?apikey=NEKOBOT&url=${query}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `View : ${get_result.view}\n`
                    ini_txt += `Rating : ${get_result.rating}\n`
                    ini_txt += `Like : ${get_result.like}\n`
                    ini_txt += `Dislike : ${get_result.dislike}\n`
                    ini_txt += `Comment : ${get_result.comment}\n`
                    ini_txt += `Tag : ${get_result.tag.join(", ")}\n`
                    ini_txt += `Description : ${get_result.description}\n`
                    ini_txt += "Link : \n"
                    ini_link = get_result.link
                    for (var x of ini_link) {
                        ini_txt += `${x.type} - ${x.link}\n\n`
                    }
                    thumbnail = await getBuffer(get_result.thumbnail)
                    await neko.sendMessage(from, thumbnail, image, { quoted: El, caption: ini_txt })
                    break
					   case 'lk21':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Transformer`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/lk21?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Link : ${get_result.link}\n`
                    ini_txt += `Genre : ${get_result.genre}\n`
                    ini_txt += `Views : ${get_result.views}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Tahun : ${get_result.tahun}\n`
                    ini_txt += `Rating : ${get_result.rating}\n`
                    ini_txt += `Desc : ${get_result.desc}\n`
                    ini_txt += `Actors : ${get_result.actors.join(", ")}\n`
                    ini_txt += `Location : ${get_result.location}\n`
                    ini_txt += `Date Release : ${get_result.date_release}\n`
                    ini_txt += `Elguage : ${get_result.Elguage}\n`
                    ini_txt += `Link Download : ${get_result.link_dl}`
                    thumbnail = await getBuffer(get_result.thumbnail)
                    await neko.sendMessage(from, thumbnail, image, { quoted: El, caption: ini_txt })
                    break
                case 'drakorongoing':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/drakorongoing?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = "Ongoing Drakor\n\n"
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Thumbnail : ${x.thumbnail}\n`
                        ini_txt += `Year : ${x.category}\n`
                        ini_txt += `Total Episode : ${x.total_episode}\n`
                        ini_txt += `Genre : ${x.genre.join(", ")}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'wattpad':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://www.wattpad.com/707367860-kumpuEl-quote-tere-liye-tere-liye-quote-quote`)
                    ini_url = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/wattpad?apikey=NEKOBOT&url=${ini_url}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Rating : ${get_result.rating}\n`
                    ini_txt += `Motify date : ${get_result.modifyDate}\n`
                    ini_txt += `Create date: ${get_result.createDate}\n`
                    ini_txt += `Word : ${get_result.word}\n`
                    ini_txt += `Comment : ${get_result.comment}\n`
                    ini_txt += `Vote : ${get_result.vote}\n`
                    ini_txt += `Reader : ${get_result.reader}\n`
                    ini_txt += `Pages : ${get_result.pages}\n`
                    ini_txt += `Description : ${get_result.desc}\n\n`
                    ini_txt += `Story : \n${get_result.story}`
                    thumbnail = await getBuffer(get_result.photo)
                    await neko.sendMessage(from, thumbnail, image, { quoted: El, caption: ini_txt })
                    break
                case 'wattpadsearch':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Tere Liye`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/wattpadsearch?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_txt = "Wattpad Seach : \n"
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Url : ${x.url}\n`
                        ini_txt += `Part : ${x.parts}\n`
                        ini_txt += `Motify date : ${x.modifyDate}\n`
                        ini_txt += `Create date: ${x.createDate}\n`
                        ini_txt += `Coment count: ${x.commentCount}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'cerpen':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/cerpen?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Creator : ${get_result.creator}\n`
                    ini_txt += `Story :\n${get_result.cerpen}`
                    reply(ini_txt)
                    break
                case 'ceritahoror':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/ceritahoror?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Desc : ${get_result.desc}\n`
                    ini_txt += `Story :\n${get_result.story}\n`
                    thumbnail = await getBuffer(get_result.thumbnail)
                    await neko.sendMessage(from, thumbnail, image, { quoted: El, caption: ini_txt })
                    break
						case 'meme': 
				if (!isRegistered) return reply(nad.noregis())
				buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/meme?apikey=NEKOBOT`, {method: 'get'})
				neko.sendMessage(from, buffer, image, {quoted: El})
				break
				case 'memeindo': 
				if (!isRegistered) return reply(nad.noregis())
				buffer = await getBuffer(`http://api.lolhuman.xyz/api/meme/memeindo?apikey=NEKOBOT`, {method: 'get'})
				neko.sendMessage(from, buffer, image, {quoted: El})
				break
				case 'darkjokes':
				case 'darkjoke': 
				if (!isRegistered) return reply(nad.noregis())
				buffer = await getBuffer(`http://api.lolhuman.xyz/api/meme/darkjoke?apikey=NEKOBOT`, {method: 'get'})
				neko.sendMessage(from, buffer, image, {quoted: El, caption: 'FIX BUG BY RIU'})
				break
				case 'namaninja': 
				if (!isRegistered) return reply(nad.noregis())
				if (args.length < 1) return reply(`Contoh: Riu Ganteng`)
					gatauda = body.slice(11)
					anu = await fetchJson(`http://api.lolhuman.xyz/api/ninja?apikey=NEKOBOT&nama=${gatauda}`)
					reply(anu.result)
					break
					case 'alay': 
				if (!isRegistered) return reply(nad.noregis())
				if (args.length < 1) return reply(`Contoh: Riu Ganteng`)
					gatauda = body.slice(11)
					anu = await fetchJson(`http://api.lolhuman.xyz/api/alay?apikey=NEKOBOT&text=${gatauda}`)
					reply(anu.result)
					break
					case 'purba':
					case 'bpurba': 
				if (!isRegistered) return reply(nad.noregis())
				if (args.length < 1) return reply(`Contoh: Riu Ganteng`)
					gatauda = body.slice(11)
					anu = await fetchJson(`http://api.lolhuman.xyz/api/bahasapurba?apikey=NEKOBOT&text=${gatauda}`)
					reply(anu.result)
					break
					case 'BK':
					case 'bk':
					case 'besarkecil': 
				if (!isRegistered) return reply(nad.noregis())
				if (args.length < 1) return reply(`Contoh: Sofyan AMV`)
					gatauda = body.slice(11)
					anu = await fetchJson(`http://api.lolhuman.xyz/api/upperlower?apikey=NEKOBOT&text=${gatauda}`)
					reply(anu.result)
					break
					case 'hilih': 
				if (!isRegistered) return reply(nad.noregis())
				if (args.length < 1) return reply(`Contoh: Riu Ganteng`)
					gatauda = body.slice(11)
					anu = await fetchJson(`http://api.lolhuman.xyz/api/hilih?apikey=NEKOBOT&text=${gatauda}`)
					reply(anu.result)
					break
				  case 'character':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Miku Nakano`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/character?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Id : ${get_result.id}\n`
                    ini_txt += `Name : ${get_result.name.full}\n`
                    ini_txt += `Native : ${get_result.name.native}\n`
                    ini_txt += `Favorites : ${get_result.favourites}\n`
                    ini_txt += `Media : \n`
                    ini_media = get_result.media.nodes
                    for (var x of ini_media) {
                        ini_txt += `- ${x.title.romaji} (${x.title.native})\n`
                    }
                    ini_txt += `\nDescription : \n${get_result.description.replace(/__/g, "_")}`
                    thumbnail = await getBuffer(get_result.image.large)
                    await neko.sendMessage(from, thumbnail, image, { quoted: El, caption: ini_txt })
                    break
                case 'manga':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/manga?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Id : ${get_result.id}\n`
                    ini_txt += `Id MAL : ${get_result.idMal}\n`
                    ini_txt += `Title : ${get_result.title.romaji}\n`
                    ini_txt += `English : ${get_result.title.english}\n`
                    ini_txt += `Native : ${get_result.title.native}\n`
                    ini_txt += `Format : ${get_result.format}\n`
                    ini_txt += `Chapters : ${get_result.chapters}\n`
                    ini_txt += `Volume : ${get_result.volumes}\n`
                    ini_txt += `Status : ${get_result.status}\n`
                    ini_txt += `Source : ${get_result.source}\n`
                    ini_txt += `Start Date : ${get_result.startDate.day} - ${get_result.startDate.month} - ${get_result.startDate.year}\n`
                    ini_txt += `End Date : ${get_result.endDate.day} - ${get_result.endDate.month} - ${get_result.endDate.year}\n`
                    ini_txt += `Genre : ${get_result.genres.join(", ")}\n`
                    ini_txt += `Synonyms : ${get_result.synonyms.join(", ")}\n`
                    ini_txt += `Score : ${get_result.averageScore}%\n`
                    ini_txt += `Characters : \n`
                    ini_character = get_result.characters.nodes
                    for (var x of ini_character) {
                        ini_txt += `- ${x.name.full} (${x.name.native})\n`
                    }
                    ini_txt += `\nDescription : ${get_result.description}`
                    thumbnail = await getBuffer(get_result.coverImage.large)
                    await neko.sendMessage(from, thumbnail, image, { quoted: El, caption: ini_txt })
                    break
                case 'anime':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/anime?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Id : ${get_result.id}\n`
                    ini_txt += `Id MAL : ${get_result.idMal}\n`
                    ini_txt += `Title : ${get_result.title.romaji}\n`
                    ini_txt += `English : ${get_result.title.english}\n`
                    ini_txt += `Native : ${get_result.title.native}\n`
                    ini_txt += `Format : ${get_result.format}\n`
                    ini_txt += `Episodes : ${get_result.episodes}\n`
                    ini_txt += `Duration : ${get_result.duration} mins.\n`
                    ini_txt += `Status : ${get_result.status}\n`
                    ini_txt += `Season : ${get_result.season}\n`
                    ini_txt += `Season Year : ${get_result.seasonYear}\n`
                    ini_txt += `Source : ${get_result.source}\n`
                    ini_txt += `Start Date : ${get_result.startDate.day} - ${get_result.startDate.month} - ${get_result.startDate.year}\n`
                    ini_txt += `End Date : ${get_result.endDate.day} - ${get_result.endDate.month} - ${get_result.endDate.year}\n`
                    ini_txt += `Genre : ${get_result.genres.join(", ")}\n`
                    ini_txt += `Synonyms : ${get_result.synonyms.join(", ")}\n`
                    ini_txt += `Score : ${get_result.averageScore}%\n`
                    ini_txt += `Characters : \n`
                    ini_character = get_result.characters.nodes
                    for (var x of ini_character) {
                        ini_txt += `- ${x.name.full} (${x.name.native})\n`
                    }
                    ini_txt += `\nDescription : ${get_result.description}`
                    thumbnail = await getBuffer(get_result.coverImage.large)
                    await neko.sendMessage(from, thumbnail, image, { quoted: El, caption: ini_txt })
                    break
                case 'wait':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        const filePath = await neko.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        const form = new FormData();
                        const stats = fs.statSync(filePath);
                        const fileSizeInBytes = stats.size;
                        const fileStream = fs.createReadStream(filePath);
                        form.append('img', fileStream, { knownLength: fileSizeInBytes });
                        const options = {
                            method: 'POST',
                            credentials: 'include',
                            body: form
                        }
                        get_result = await fetchJson(`http://api.lolhuman.xyz/api/wait?apikey=NEKOBOT`, {...options })
                        fs.unlinkSync(filePath)
                        get_result = get_result.result
                        ini_video = await getBuffer(get_result.video)
                        ini_txt = `Anilist id : ${get_result.anilist_id}\n`
                        ini_txt += `MAL id : ${get_result.mal_id}\n`
                        ini_txt += `Title Romaji : ${get_result.title_romaji}\n`
                        ini_txt += `Title Native : ${get_result.title_native}\n`
                        ini_txt += `Title English : ${get_result.title_english}\n`
                        ini_txt += `at : ${get_result.at}\n`
                        ini_txt += `Episode : ${get_result.episode}\n`
                        ini_txt += `Similarity : ${get_result.similarity}`
                        await neko.sendMessage(from, ini_video, video, { quoted: El, caption: ini_txt })
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'kusonime':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://kusonime.com/nanatsu-no-taizai-bd-batch-subtitle-indonesia/`)
                    ini_url = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/kusonime?apikey=NEKOBOT&url=${ini_url}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Japanese : ${get_result.japanese}\n`
                    ini_txt += `Genre : ${get_result.genre}\n`
                    ini_txt += `Seasons : ${get_result.seasons}\n`
                    ini_txt += `Producers : ${get_result.producers}\n`
                    ini_txt += `Type : ${get_result.type}\n`
                    ini_txt += `Status : ${get_result.status}\n`
                    ini_txt += `Total Episode : ${get_result.total_episode}\n`
                    ini_txt += `Score : ${get_result.score}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Released On : ${get_result.released_on}\n`
                    ini_txt += `Desc : ${get_result.desc}\n`
                    link_dl = get_result.link_dl
                    for (var x in link_dl) {
                        ini_txt += `\n${x}\n`
                        for (var y in link_dl[x]) {
                            ini_txt += `${y} - ${link_dl[x][y]}\n`
                        }
                    }
                    ini_buffer = await getBuffer(get_result.thumbnail)
                    await neko.sendMessage(from, ini_buffer, image, { quoted: El, caption: ini_txt })
                    break
                case 'kusonimesearch':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/kusonimesearch?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Japanese : ${get_result.japanese}\n`
                    ini_txt += `Genre : ${get_result.genre}\n`
                    ini_txt += `Seasons : ${get_result.seasons}\n`
                    ini_txt += `Producers : ${get_result.producers}\n`
                    ini_txt += `Type : ${get_result.type}\n`
                    ini_txt += `Status : ${get_result.status}\n`
                    ini_txt += `Total Episode : ${get_result.total_episode}\n`
                    ini_txt += `Score : ${get_result.score}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Released On : ${get_result.released_on}\n`
                    ini_txt += `Desc : ${get_result.desc}\n`
                    link_dl = get_result.link_dl
                    for (var x in link_dl) {
                        ini_txt += `\n${x}\n`
                        for (var y in link_dl[x]) {
                            ini_txt += `${y} - ${link_dl[x][y]}\n`
                        }
                    }
                    ini_buffer = await getBuffer(get_result.thumbnail)
                    await neko.sendMessage(from, ini_buffer, image, { quoted: El, caption: ini_txt })
                    break
                case 'otakudesu':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://otakudesu.tv/lengkap/pslcns-sub-indo/`)
                    ini_url = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/otakudesu?apikey=NEKOBOT&url=${ini_url}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Japanese : ${get_result.japanese}\n`
                    ini_txt += `Judul : ${get_result.judul}\n`
                    ini_txt += `Type : ${get_result.type}\n`
                    ini_txt += `Episode : ${get_result.episodes}\n`
                    ini_txt += `Aired : ${get_result.aired}\n`
                    ini_txt += `Producers : ${get_result.producers}\n`
                    ini_txt += `Genre : ${get_result.genres}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Studios : ${get_result.status}\n`
                    ini_txt += `Rating : ${get_result.rating}\n`
                    ini_txt += `Credit : ${get_result.credit}\n`
                    get_link = get_result.link_dl
                    for (var x in get_link) {
                        ini_txt += `\n\n*${get_link[x].title}*\n`
                        for (var y in get_link[x].link_dl) {
                            ini_info = get_link[x].link_dl[y]
                            ini_txt += `\n\`\`\`Reso : \`\`\`${ini_info.reso}\n`
                            ini_txt += `\`\`\`Size : \`\`\`${ini_info.size}\n`
                            ini_txt += `\`\`\`Link : \`\`\`\n`
                            down_link = ini_info.link_dl
                            for (var z in down_link) {
                                ini_txt += `${z} - ${down_link[z]}\n`
                            }
                        }
                    }
                    reply(ini_txt)
                    break
                case 'otakudesusearch':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/otakudesusearch?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Japanese : ${get_result.japanese}\n`
                    ini_txt += `Judul : ${get_result.judul}\n`
                    ini_txt += `Type : ${get_result.type}\n`
                    ini_txt += `Episode : ${get_result.episodes}\n`
                    ini_txt += `Aired : ${get_result.aired}\n`
                    ini_txt += `Producers : ${get_result.producers}\n`
                    ini_txt += `Genre : ${get_result.genres}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Studios : ${get_result.status}\n`
                    ini_txt += `Rating : ${get_result.rating}\n`
                    ini_txt += `Credit : ${get_result.credit}\n`
                    get_link = get_result.link_dl
                    for (var x in get_link) {
                        ini_txt += `\n\n*${get_link[x].title}*\n`
                        for (var y in get_link[x].link_dl) {
                            ini_info = get_link[x].link_dl[y]
                            ini_txt += `\n\`\`\`Reso : \`\`\`${ini_info.reso}\n`
                            ini_txt += `\`\`\`Size : \`\`\`${ini_info.size}\n`
                            ini_txt += `\`\`\`Link : \`\`\`\n`
                            down_link = ini_info.link_dl
                            for (var z in down_link) {
                                ini_txt += `${z} - ${down_link[z]}\n`
                            }
                        }
                    }
                    reply(ini_txt)
                    break
                case 'nhentai':
                    if (args.length == 0) return reply(`Example: ${prefix + command} 344253`)
                    henid = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nhentai/${henid}?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Title Romaji : ${get_result.title_romaji}\n`
                    ini_txt += `Title Native : ${get_result.title_native}\n`
                    ini_txt += `Read Online : ${get_result.read}\n`
                    get_info = get_result.info
                    ini_txt += `Parodies : ${get_info.parodies}\n`
                    ini_txt += `Character : ${get_info.characters.join(", ")}\n`
                    ini_txt += `Tags : ${get_info.tags.join(", ")}\n`
                    ini_txt += `Artist : ${get_info.artists}\n`
                    ini_txt += `Group : ${get_info.groups}\n`
                    ini_txt += `Elguager : ${get_info.Elguages.join(", ")}\n`
                    ini_txt += `Categories : ${get_info.categories}\n`
                    ini_txt += `Pages : ${get_info.pages}\n`
                    ini_txt += `Uploaded : ${get_info.uploaded}\n`
                    reply(ini_txt)
                    break
                case 'nhentaipdf':
                    if (args.length == 0) return reply(`Example: ${prefix + command} 344253`)
                    henid = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nhentaipdf/${henid}?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_buffer = await getBuffer(get_result)
                    await neko.sendMessage(from, ini_buffer, document, { quoted: El, mimetype: Mimetype.pdf, filename: `${henid}.pdf` })
                    break
                case 'nhentaisearch':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nhentaisearch?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_txt = "Result : \n"
                    for (var x of get_result) {
                        ini_txt += `Id : ${x.id}\n`
                        ini_txt += `Title English : ${x.title_english}\n`
                        ini_txt += `Title Japanese : ${x.title_japanese}\n`
                        ini_txt += `Native : ${x.title_native}\n`
                        ini_txt += `Upload : ${x.date_upload}\n`
                        ini_txt += `Page : ${x.page}\n`
                        ini_txt += `Favourite : ${x.favourite}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'nekopoi':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://nekopoi.care/isekai-harem-monogatari-episode-4-subtitle-indonesia/`)
                    ini_url = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nekopoi?apikey=NEKOBOT&url=${ini_url}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.anime}\n`
                    ini_txt += `Porducers : ${get_result.producers}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Size : ${get_result.size}\n`
                    ini_txt += `Sinopsis : ${get_result.sinopsis}\n`
                    link = get_result.link
                    for (var x in link) {
                        ini_txt += `\n${link[x].name}\n`
                        link_dl = link[x].link
                        for (var y in link_dl) {
                            ini_txt += `${y} - ${link_dl[y]}\n`
                        }
                    }
                    ini_buffer = await getBuffer(get_result.thumb)
                    await neko.sendMessage(from, ini_buffer, image, { quoted: El, caption: ini_txt })
                    break
                case 'nekopoisearch':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Isekai Harem`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nekopoisearch?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_txt = ""
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Thumbnail : ${x.thumbnail}\n\n`
                    }
                    reply(ini_txt)
                    break

                    // Information //
                case 'kbbi':
                    if (args.length == 0) return reply(`Example: ${prefix + command} kursi`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/kbbi?apikey=NEKOBOT&query=${args.join(" ")}`)
                    lila = get_result.result
                    ini_txt = `\`\`\`Kata : ${lila[0].nama}\`\`\`\n`
                    ini_txt += `\`\`\`Kata Dasar : ${lila[0].kata_dasar}\`\`\`\n`
                    ini_txt += `\`\`\`PelafaEl : ${lila[0].pelafaEl}\`\`\`\n`
                    ini_txt += `\`\`\`Bentuk Tidak Baku : ${lila[0].bentuk_tidak_baku}\`\`\`\n\n`
                    for (var x of lila) {
                        ini_txt += `\`\`\`Kode : ${x.makna[0].kelas[0].kode}\`\`\`\n`
                        ini_txt += `\`\`\`Kelas : ${x.makna[0].kelas[0].nama}\`\`\`\n`
                        ini_txt += `\`\`\`Artinya : \n${x.makna[0].kelas[0].deskripsi}\`\`\`\n\n`
                        ini_txt += `\`\`\`Makna Lain : \n${x.makna[0].submakna}\`\`\`\n `
                        ini_txt += `\`\`\`Contoh Kalimat : \n${x.makna[0].contoh}\`\`\`\n`
                    }
                    reply(ini_txt)
                    break
                case 'brainly2':
                    if (args.length == 0) return reply(`Example: ${prefix + command} siapakah sukarno`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/brainly2?apikey=NEKOBOT&query=${args.join(" ")}`)
                    lala = get_result.result
                    ini_txt = "Beberapa Pembahasan Dari Brainly :\n\n"
                    for (var x of lala) {
                        ini_txt += `==============================\n`
                        ini_txt += `\`\`\`Pertanyaan :\`\`\`\n${x.question.content}\n\n`
                        ini_txt += `\`\`\`Jawaban :\`\`\`\n${x.answer[0].content}\n`
                        ini_txt += `==============================\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'jarak':
                    if (args.length == 0) return reply(`Example: ${prefix + command} jakarta - yogyakarta`)
                    pauls = args.join(" ")
                    teks1 = pauls.split("-")[0].trim()
                    teks2 = pauls.split("-")[1].trim()
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/jaraktempuh?apikey=NEKOBOT&kota1=${teks1}&kota2=${teks2}`)
                    x = get_result.result
                    ini_txt = `Informasi Jarak dari ${teks1} ke ${teks2} :\n\n`
                    ini_txt += `\`\`\`◪ Asal :\`\`\` ${x.from.name}\n`
                    ini_txt += `\`\`\`◪ Garis Lintang :\`\`\` ${x.from.latitude}\n`
                    ini_txt += `\`\`\`◪ Garis Bujur :\`\`\` ${x.from.longitude}\n\n`
                    ini_txt += `\`\`\`◪ Tujuan :\`\`\` ${x.to.name}\n`
                    ini_txt += `\`\`\`◪ Garis Lintang :\`\`\` ${x.to.latitude}\n`
                    ini_txt += `\`\`\`◪ Garis Bujur :\`\`\` ${x.to.longitude}\n\n`
                    ini_txt += `\`\`\`◪ Jarak Tempuh :\`\`\` ${x.jarak}\n`
                    ini_txt += `\`\`\`◪ Waktu Tempuh :\`\`\`\n`
                    ini_txt += `   ╭───────────────❏\n`
                    ini_txt += `❍┤ Kereta Api : ${x.kereta_api}\n`
                    ini_txt += `❍┤ Pesawat : ${x.pesawat}\n`
                    ini_txt += `❍┤ Mobil : ${x.mobil}\n`
                    ini_txt += `❍┤ Motor : ${x.motor}\n`
                    ini_txt += `❍┤ JaEl Kaki : ${x.jaEl_kaki}\n`
                    ini_txt += `   ╰───────────────❏\n`
                    reply(ini_txt)
                    break
                case 'urbandictionary':
                    urb = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/urdict?apikey=NEKOBOT&query=${urb}`)
                    lilu = get_result.result
                    for (var x of lilu) {
                        ini_txt = `\`\`\`Meaning :\n${x.definition}\`\`\`\n\n`
                        ini_txt += `\`\`\`Link : ${x.permalink}\`\`\`\n\n`
                        ini_txt += `\`\`\`Sounds Url : ${x.sound_urls[0]}\`\`\`\n\n`
                        ini_txt += `\`\`\`Like : ${x.thumbs_up}\`\`\`\n\n`
                        ini_txt += `\`\`\`Dislike : ${x.thumbs_down}\`\`\`\n\n`
                        ini_txt += `\`\`\`Created On : \n${x.written_on}\`\`\`\n\n`
                        ini_txt += `\`\`\`Author : ${x.author}\`\`\`\n\n`
                        ini_txt += `\`\`\`Word : ${x.word}\`\`\`\n\n`
                        ini_txt += `\`\`\`Defined Id : ${x.defid}\`\`\`\n\n`
                        ini_txt += `\`\`\`Example : ${x.example}\`\`\`\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'chord':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Melukis senja`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/chord?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Chord : \n${get_result.chord}`
                    reply(ini_txt)
                    break
                case 'heroml':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Fanny`)
                    hero = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/heroml/${hero}?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Name : ${get_result.hero_name}\n`
                    ini_txt += `Entrance Quotes : ${get_result.ent_quotes}\n`
                    ini_txt += `Role : ${get_result.detail.role}\n`
                    ini_txt += `Specialty : ${get_result.detail.specialty}\n`
                    ini_txt += `Loling : ${get_result.detail.Loling_recommendation}\n`
                    ini_txt += `Release : ${get_result.detail.release_date}\n`
                    ini_txt += `Movement speed : ${get_result.attr.movement_speed}\n`
                    ini_txt += `Physical attack : ${get_result.attr.physical_attack}\n`
                    ini_txt += `Magic power : ${get_result.attr.magic_power}\n`
                    ini_txt += `Physical defense : ${get_result.attr.physical_defense}\n`
                    ini_txt += `Magic defense : ${get_result.attr.magic_defense}\n`
                    ini_txt += `Critical rate : ${get_result.attr.basic_atk_crit_rate}\n`
                    ini_txt += `Hp : ${get_result.attr.hp}\n`
                    ini_txt += `Mana : ${get_result.attr.mana}\n`
                    ini_txt += `Mana regen : ${get_result.attr.mana_regen}\n`
                    ini_icon = await getBuffer(get_result.icon)
                    await neko.sendMessage(from, ini_icon, image, { quoted: El, caption: ini_txt })
                    break
                case 'mlstalk':
                    if (args.length == 0) return reply(`Example: ${prefix + command} 84830127/2169`)
                    ml_id = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/mobilelegend/${ml_id}?apikey=NEKOBOT`)
                    reply(get_result.result)
                    break
                case 'genshin':
                    if (args.length == 0) return reply(`Example: ${prefix + command} jean`)
                    hero = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/genshin/${hero}?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Name : ${get_result.title}\n`
                    ini_txt += `Intro : ${get_result.intro}\n`
                    ini_txt += `Icon : ${get_result.icon}\n`
                    ini_icon = await getBuffer(get_result.cover1)
                    await neko.sendMessage(from, ini_icon, image, { quoted: El, caption: ini_txt })
                    ini_voice = await getBuffer(get_result.cv[0].audio[0])
                    await neko.sendMessage(from, ini_voice, audio, { quoted: El, mimetype: Mimetype.mp4Audio })
                    break
                case 'qrreader':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        const filePath = await neko.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        const form = new FormData();
                        const stats = fs.statSync(filePath);
                        const fileSizeInBytes = stats.size;
                        const fileStream = fs.createReadStream(filePath);
                        form.append('img', fileStream, { knownLength: fileSizeInBytes });
                        const options = {
                            method: 'POST',
                            credentials: 'include',
                            body: form
                        }
                        get_result = await fetchJson(`http://api.lolhuman.xyz/api/read-qr?apikey=NEKOBOT`, {...options })
                        fs.unlinkSync(filePath)
                        reply("Result: " + get_result.result)
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'wikipedia':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Tahu`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/wiki?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    reply(get_result)
                    break
                case 'translate':
                    if (args.length == 0) return reply(`Example: ${prefix + command} en Tahu Bacem`)
                    kode_negara = args[0]
                    args.shift()
                    ini_txt = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/translate/auto/${kode_negara}?apikey=NEKOBOT&text=${ini_txt}`)
                    get_result = get_result.result
                    init_txt = `From : ${get_result.from}\n`
                    init_txt += `To : ${get_result.to}\n`
                    init_txt += `Original : ${get_result.original}\n`
                    init_txt += `Translated : ${get_result.translated}\n`
                    init_txt += `Pronunciation : ${get_result.pronunciation}\n`
                    reply(init_txt)
                    break
                case 'brainly':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Soekarno adalah`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/brainly?apikey=NEKOBOT&query=${query}`)
                    get_result = get_result.result
                    ini_txt = "Result : \n"
                    for (var x of get_result) {
                        ini_txt += `${x.title}\n`
                        ini_txt += `${x.url}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'jadwaltv':
                    if (args.length == 0) return reply(`Example: ${prefix + command} RCTI`)
                    channel = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/jadwaltv/${channel}?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Jadwal TV ${channel.toUpperCase()}\n`
                    for (var x in get_result) {
                        ini_txt += `${x} - ${get_result[x]}\n`
                    }
                    reply(ini_txt)
                    break
                case 'jadwaltvnow':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/jadwaltv/now?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Jadwal TV Now :\n`
                    for (var x in get_result) {
                        ini_txt += `${x.toUpperCase()}${get_result[x]}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'newsinfo':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/newsinfo?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = "Result :\n"
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Author : ${x.author}\n`
                        ini_txt += `Source : ${x.source.name}\n`
                        ini_txt += `Url : ${x.url}\n`
                        ini_txt += `Published : ${x.publishedAt}\n`
                        ini_txt += `Description : ${x.description}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'cnnindonesia':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/cnnindonesia?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = "Result :\n"
                    for (var x of get_result) {
                        ini_txt += `Judul : ${x.judul}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Tipe : ${x.tipe}\n`
                        ini_txt += `Published : ${x.waktu}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'cnnnasional':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/cnnindonesia/nasional?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = "Result :\n"
                    for (var x of get_result) {
                        ini_txt += `Judul : ${x.judul}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Tipe : ${x.tipe}\n`
                        ini_txt += `Published : ${x.waktu}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'cnninternasional':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/cnnindonesia/internasional?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = "Result :\n"
                    for (var x of get_result) {
                        ini_txt += `Judul : ${x.judul}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Tipe : ${x.tipe}\n`
                        ini_txt += `Published : ${x.waktu}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'infogempa':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/infogempa?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Lokasi : ${get_result.lokasi}\n`
                    ini_txt += `Waktu : ${get_result.waktu}\n`
                    ini_txt += `Potensi : ${get_result.potensi}\n`
                    ini_txt += `Magnitude : ${get_result.magnitude}\n`
                    ini_txt += `Kedalaman : ${get_result.kedalaman}\n`
                    ini_txt += `Koordinat : ${get_result.koordinat}`
                    get_buffer = await getBuffer(get_result.map)
                    await neko.sendMessage(from, get_buffer, image, { quoted: El, caption: ini_txt })
                    break
                case 'lirik':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/lirik?apikey=NEKOBOT&query=${query}`)
                    reply(get_result.result)
                    break
                case 'cuaca':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Yogyakarta`)
                    daerah = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/cuaca/${daerah}?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Tempat : ${get_result.tempat}\n`
                    ini_txt += `Cuaca : ${get_result.cuaca}\n`
                    ini_txt += `Angin : ${get_result.angin}\n`
                    ini_txt += `Description : ${get_result.description}\n`
                    ini_txt += `Kelembapan : ${get_result.kelembapan}\n`
                    ini_txt += `Suhu : ${get_result.suhu}\n`
                    ini_txt += `Udara : ${get_result.udara}\n`
                    ini_txt += `Permukaan laut : ${get_result.permukaan_laut}\n`
                    await neko.sendMessage(from, { degreesLatitude: get_result.latitude, degreesLongitude: get_result.longitude }, location, { quoted: El })
                    reply(ini_txt)
                    break
                case 'covidindo':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/corona/indonesia?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Positif : ${get_result.positif}\n`
                    ini_txt += `Sembuh : ${get_result.sembuh}\n`
                    ini_txt += `Dirawat : ${get_result.dirawat}\n`
                    ini_txt += `Meninggal : ${get_result.meninggal}`
                    reply(ini_txt)
                    break
                case 'covidglobal':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/corona/global?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Positif : ${get_result.positif}\n`
                    ini_txt += `Sembuh : ${get_result.sembuh}\n`
                    ini_txt += `Dirawat : ${get_result.dirawat}\n`
                    ini_txt += `Meninggal : ${get_result.meninggal}`
                    reply(ini_txt)
                    break
                case 'kodepos':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Slemanan or ${prefix + command} 66154`)
                    daerah = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/kodepos?apikey=NEKOBOT&query=${daerah}`)
                    get_result = get_result.result[0]
                    ini_txt = `Provinsi : ${get_result.province}\n`
                    ini_txt += `Kabupaten : ${get_result.city}\n`
                    ini_txt += `Kecamatan : ${get_result.subdistrict}\n`
                    ini_txt += `Kelurahan : ${get_result.urban}\n`
                    ini_txt += `Kode Pos : ${get_result.postalcode}`
                    reply(ini_txt)
                    break
                case 'jadwalbola':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/jadwalbola?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = "Jadwal Bola :\n"
                    for (var x of get_result) {
                        ini_txt += `Hari : ${x.hari}\n`
                        ini_txt += `Jam : ${x.jam}\n`
                        ini_txt += `Event : ${x.event}\n`
                        ini_txt += `Match : ${x.match}\n`
                        ini_txt += `TV : ${x.tv}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'indbeasiswa':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/indbeasiswa?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = 'Info Beasiswa :\n'
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Link : ${x.link}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'hoax':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/turnbackhoax?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = 'Info Hoax :\n'
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Posted : ${x.posted}\n`
                        ini_txt += `Description : ${x.desc}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'nsfwcheck':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
                        var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        var filePath = await neko.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        var form = new FormData();
                        var stats = fs.statSync(filePath);
                        var fileSizeInBytes = stats.size;
                        var fileStream = fs.createReadStream(filePath);
                        form.append('img', fileStream, { knownLength: fileSizeInBytes });
                        var options = {
                            method: 'POST',
                            credentials: 'include',
                            body: form
                        }
                        get_result = await fetchJson(`http://api.lolhuman.xyz/api/nsfwcheck?apikey=NEKOBOT`, {...options })
                        fs.unlinkSync(filePath)
                        get_result = get_result.result
                        is_nsfw = "No"
                        if (Number(get_result.replace("%", "")) >= 50) is_nsfw = "Yes"
                        reply(`Is NSFW? ${is_nsfw}\nNSFW Score : ${get_result}`)
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'ocr':
                    if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
                        var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        var filePath = await neko.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        var form = new FormData();
                        var stats = fs.statSync(filePath);
                        var fileSizeInBytes = stats.size;
                        var fileStream = fs.createReadStream(filePath);
                        form.append('img', fileStream, { knownLength: fileSizeInBytes });
                        var options = {
                            method: 'POST',
                            credentials: 'include',
                            body: form
                        }
                        get_result = await fetchJson(`http://api.lolhuman.xyz/api/ocr?apikey=NEKOBOT`, {...options })
                        fs.unlinkSync(filePath)
                        get_result = get_result.result
                        reply(`Result : ${get_result}`)
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break
							

                 
					                case 'quotes':
                    quotes = await fetchJson(`http://api.lolhuman.xyz/api/random/quotes?apikey=NEKOBOT`)
                    quotes = quotes.result
                    author = quotes.by
                    quotes = quotes.quote
                    reply(`_${quotes}_\n\n*― ${author}*`)
                    break
                case 'quotesanime':
                    quotes = await fetchJson(`http://api.lolhuman.xyz/api/random/quotesnime?apikey=NEKOBOT`)
                    quotes = quotes.result
                    quote = quotes.quote
                    char = quotes.character
                    anime = quotes.anime
                    episode = quotes.episode
                    reply(`_${quote}_\n\n*― ${char}*\n*― ${anime} ${episode}*`)
                    break
                case 'quotesdiEl':
                    quotediEl = await fetchJson(`http://api.lolhuman.xyz/api/quotes/diEl?apikey=NEKOBOT`)
                    reply(quotediEl.result)
                    break
                case 'quotesimage':
                    get_result = await getBuffer(`http://api.lolhuman.xyz/api/random/${command}?apikey=NEKOBOT`)
                    await neko.sendMessage(from, get_result, image, { quotes: El })
                    break
                case 'faktaunik':
                case 'katabijak':
                case 'pantun':
                case 'bucin':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/random/${command}?apikey=NEKOBOT`)
                    reply(get_result.result)
                    break
                case 'randomnama':
                    anu = await fetchJson(`http://api.lolhuman.xyz/api/random/nama?apikey=NEKOBOT`)
                    reply(anu.result)
                    break
			case 'comictext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}comictext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/comic_text?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'hekerlogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}hekerlogo Noel`)
					reply(`[🗿] Buset Hemker`)
					vhbuff = await getBuffer(`https://api.vhtear.com/hacker_avatar?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'graffiti':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(10)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}graffiti Noel & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/cool_wall_graffiti?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'glowtext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}glowtext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/glow_metallic?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'covertext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}covertext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/cover_banner?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'narutotext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}narutotext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/naruto_text?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'erodedtext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}erodedtext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/eroded_metal?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'walltext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}walltext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/the_wall?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'vietteltext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}vietteltext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/viettel_text?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
			case 'valorantbanner':
			if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
				if (args.length < 1) return reply(`Text Mana Cuy?\n*Contoh ${prefix}valorantbanner neko|Ganteng|Banget*`)
				ct = body.slice(15)
				ll1 = ct.split("|")[0];
                ll2 = ct.split("|")[1];
				ll3 = ct.split("|")[2];
				buffer = await getBuffer(`http://api.lolhuman.xyz/api/ephoto3/valorantbanner?apikey=NEKOBOT&text1=${ll1}&text2=${ll2}&text3=${ll3}`)
			   reply(nad.wait())
				neko.sendMessage(from, buffer, image, { quoted: El, caption: 'Nih Hasilnya...' })
				break
			case 'wingstext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}wingstext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/wings_galaxy?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'halloween':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}halloween Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/halloween_text?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'graffiti2':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(11)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}graffiti2 Noel & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/girl_graffiti?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'graffiti3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}graffiti3 Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/cartoon_graffiti?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'foiltext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}foiltext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/foil_text?text=VHTEAR&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'bloodtext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}bloodtext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/blood_text?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'hekertext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}hekertext Noel`)
					reply(`[😎] Heker AbiZzz`)
					vhbuff = await getBuffer(`https://api.vhtear.com/matrix_text?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'bokehtext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}bokehtext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/bokeh_text?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'carbontext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}carbontext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/carbon_text?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'avengerstext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(14)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}avengerstext Noel & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/avengers_text?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'watertext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}watertext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/water_maker?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'firetext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}firetext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/fire_maker?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'metaltext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}metaltext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/metal_maker?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'ballontext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(12)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}ballontext Noel & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/balloonmaker?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'gemboktext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(12)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}gemboktext 11 01 2021 & Noel dan Nadia`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/padlock?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'bannerff':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(10)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}bannerff Noel & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/bannerff?title=${ve}&text=${za}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'aloklogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}aloklogo Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/logoff?hero=alok&text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'miyalogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}miyalogo Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/logoml?hero=miya&text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'gamelogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}gamelogo Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/gamelogo?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'blackpink':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}blackpink Noel`)
					reply(`[😱] Hah Blekping :v`)
					vhbuff = await getBuffer(`https://api.vhtear.com/blackpinkicon?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'thundername':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}thundername Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/thundertext?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'silktext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}silktext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/silktext?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'partytext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}partytext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/partytext?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'romancetext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}romancetext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/romancetext?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'googletext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(12)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					var ga = gh.split("&")[2];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}googletext Noel & Noel Gans & Noel Baik`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/googletext?text1=${ve}&text2=${za}&text3=${ga}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'glowtext2':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}glowtext2 Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/glowtext?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'lovemessage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}lovemessage Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/lovemessagetext?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'glitchtext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(12)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}glitchtext Noel & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/glitchtext?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'galaxytext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}galaxytext Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/galaxytext?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'pornhub':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(9)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}pornhub Noel & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/pornlogo?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'hartatahta':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}hartatahta Noel`)
					reply(`[❗] Hirti Tihti Tai Anjg :v`)
					vhbuff = await getBuffer(`https://api.vhtear.com/hartatahta?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'wetglass':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}wetglass Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/wetglass?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'stylelogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}stylelogo Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/stylelogo?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'watercolor':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}watercolor Noel`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/watercolor?text=${q}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
				case 'wolflogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(10)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}wolflogo Noel & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/avatarwolf?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					neko.sendMessage(from, vhbuff, image, { quoted: El })
					break
/*]====> BY Noel <====[*/
				//case 'sertifikatmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const serti = `「 *SERTIFIKAT MENU* 」
❏ ${prefix}sertiharam
❏ ${prefix}sertibabu
❏ ${prefix}sertibucin
❏ ${prefix}sertibocilff
❏ ${prefix}sertigay
❏ ${prefix}sertipacar
❏ ${prefix}sertisadboy
❏ ${prefix}sertisurga
❏ ${prefix}sertipinter
❏ ${prefix}sertibadboy
❏ ${prefix}sertibadgirl
❏ ${prefix}sertigoodgirl
❏ ${prefix}sertigoodboy
❏ ${prefix}sertieditor
❏ ${prefix}sertigudluking
❏ ${prefix}sertipakboy
❏ ${prefix}sertijamet
❏ ${prefix}sertiyutub
❏ ${prefix}sertiheker
❏ ${prefix}sertiff1
❏ ${prefix}sertiff2
❏ ${prefix}sertiff3
❏ ${prefix}sertiff4
❏ ${prefix}sertiff5
❏ ${prefix}sertipubg1
❏ ${prefix}sertipubg2
❏ ${prefix}sertiml

「 *${botName}* 」`
					fakestatus(serti)
					break
                    case 'sertiharam':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiharam botwea`)
                    reply(nad.wait())
                    menghayu = await getBuffer(`http://onlydevcity.xyz/AnakHaramSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, menghayu, image, { quoted: El })
                    break
                    case 'sertibabu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertibabu botwea`)
                    reply(nad.wait())
                    sertibab = await getBuffer(`http://onlydevcity.xyz/BabuSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertibab, image, { quoted: El })
                    break
                    case 'sertibucin':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertibucin botwea`)
                    reply(nad.wait())
                    sertibuci = await getBuffer(`http://onlydevcity.xyz/BucinSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertibuci, image, { quoted: El })
                    break
                    case 'sertibocilff':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertibocilff botwea`)
                    reply(nad.wait())
                    sertibocilf = await getBuffer(`http://onlydevcity.xyz/CilEpepSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertibocilf, image, { quoted: El })
                    break
                    case 'sertigay':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertigay botwea`)
                    reply(nad.wait())
                    sertiga = await getBuffer(`http://onlydevcity.xyz/GaySerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertiga, image, { quoted: El })
                    break
                    case 'sertipacar':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertipacar botwea`)
                    reply(nad.wait())
                    sertipaca = await getBuffer(`http://onlydevcity.xyz/PacarSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertipaca, image, { quoted: El })
                    break
                    case 'sertisadboy':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertisadboy botwea`)
                    reply(nad.wait())
                    sertisadbo = await getBuffer(`http://onlydevcity.xyz/SadBoySerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertisadbo, image, { quoted: El })
                    break
                    case 'sertisurga':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertisurga botwea`)
                    reply(nad.wait())
                    sertisurg = await getBuffer(`http://onlydevcity.xyz/SurgaSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertisurg, image, { quoted: El })
                    break
                    case 'sertipinter':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertipinter botwea`)
                    reply(nad.wait())
                    sertipinte = await getBuffer(`http://onlydevcity.xyz/PintarSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertipinte, image, { quoted: El })
                    break
                    case 'sertibadboy':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertibadboy botwea`)
                    reply(nad.wait())
                    sertibadbo = await getBuffer(`http://onlydevcity.xyz/BadBoySerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertibadbo, image, { quoted: El })
                    break
                    case 'sertibadgirl':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertibadgirl botwea`)
                    reply(nad.wait())
                    sertibadgir = await getBuffer(`http://onlydevcity.xyz/BadGirlSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertibadgir, image, { quoted: El })
                    break
                    case 'sertigoodgirl':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertigoodgirl botwea`)
                    reply(nad.wait())
                    sertigoodgir = await getBuffer(`http://onlydevcity.xyz/GoodGirlSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertigoodgir, image, { quoted: El })
                    break
                    case 'sertigoodboy':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertigoodboy botwea`)
                    reply(nad.wait())
                    sertigoodbo = await getBuffer(`http://onlydevcity.xyz/GoodBoySerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertigoodbo, image, { quoted: El })
                    break
                    case 'sertieditor':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertieditor botwea`)
                    reply(nad.wait())
                    sertiedito = await getBuffer(`http://onlydevcity.xyz/EditorBerkelasSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertiedito, image, { quoted: El })
                    break
                    case 'sertigudluking':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertigudluking botwea`)
                    reply(nad.wait())
                    sertigudlukin = await getBuffer(`http://onlydevcity.xyz/GoodLookingSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertigudlukin, image, { quoted: El })
                    break
                    case 'sertipakboy':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertipakboy botwea`)
                    reply(nad.wait())
                    sertipakbo = await getBuffer(`http://onlydevcity.xyz/FucekBoySerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertipakbo, image, { quoted: El })
                    break
                    case 'sertijamet':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertijamet botwea`)
                    reply(nad.wait())
                    sertijame = await getBuffer(`http://onlydevcity.xyz/JametSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertijame, image, { quoted: El })
                    break
                    case 'sertiyutub':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiyutub botwea`)
                    reply(nad.wait())
                    sertiyutu = await getBuffer(`http://onlydevcity.xyz/YoutuberSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertiyutu, image, { quoted: El })
                    break
                    case 'sertiheker':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiheker botwea`)
                    reply(nad.wait())
                    sertiheke = await getBuffer(`http://onlydevcity.xyz/HekerSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertiheke, image, { quoted: El })
                    break
                    case 'sertiff1':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiff1 botwea`)
                    reply(nad.wait())
                    sertiff = await getBuffer(`http://onlydevcity.xyz/FFSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertiff, image, { quoted: El })
                    break
                    case 'sertiff2':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiff2 botwea`)
                    reply(nad.wait())
                    sertif = await getBuffer(`http://onlydevcity.xyz/FFSerti2/img.php?nama=${q}`)
                    neko.sendMessage(from, sertif, image, { quoted: El })
                    break
                    case 'sertiff3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiff3 botwea`)
                    reply(nad.wait())
                    sertifa = await getBuffer(`http://onlydevcity.xyz/FFSerti3/img.php?nama=${q}`)
                    neko.sendMessage(from, sertifa, image, { quoted: El })
                    break
                    case 'sertiff4':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiff4 botwea`)
                    reply(nad.wait())
                    sertifb = await getBuffer(`http://onlydevcity.xyz/FFSerti4/img.php?nama=${q}`)
                    neko.sendMessage(from, sertifb, image, { quoted: El })
                    break
                    case 'sertiff5':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiff5 botwea`)
                    reply(nad.wait())
                    sertifc = await getBuffer(`http://onlydevcity.xyz/FFSerti5/img.php?nama=${q}`)
                    neko.sendMessage(from, sertifc, image, { quoted: El })
                    break
                    case 'sertipubg1':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertipubg1 botwea`)
                    reply(nad.wait())
                    sertipubg = await getBuffer(`http://onlydevcity.xyz/PubgTourSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertipubg, image, { quoted: El })
                    break
                    case 'sertipubg2':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertipubg2 botwea`)
                    reply(nad.wait())
                    sertipub = await getBuffer(`http://onlydevcity.xyz/PubgTourSerti2/img.php?nama=${q}`)
                    neko.sendMessage(from, sertipub, image, { quoted: El })
                    break
                    case 'sertiml':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiml botwea`)
                    reply(nad.wait())
                    sertim = await getBuffer(`http://onlydevcity.xyz/MLTourSerti/img.php?nama=${q}`)
                    neko.sendMessage(from, sertim, image, { quoted: El })
                    break
				//case 'gabutmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const gabut = `「 *GABUT MENU* 」
❏ ${prefix}tebakin
❏ ${prefix}caklontong
❏ ${prefix}bisakah
❏ ${prefix}kapankah
❏ ${prefix}apakah
❏ ${prefix}rate
❏ ${prefix}hobby
❏ ${prefix}truth
❏ ${prefix}dare
❏ ${prefix}cekbapak
❏ ${prefix}seberapagay

「 *${botName}* 」`
					fakestatus(gabut)
					break
				case 'seberapagay':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
				anu = await fetchJson(`https://arugaz.herokuapp.com/api/howgay`, {method: 'get'})
				hasil = `Nih Liat Data Gay Si ${q}\n\n\nPersentase Gay : ${anu.persen}%\nAlert!!! : ${anu.desc}`
				reply(hasil)
				break
				case 'tebakin':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					anu = await fetchJson(`https://api.vhtear.com/tebakgambar&apikey=${vhtear}`)
					tebak = await getBuffer(anu.result.soalImg)
					setTimeout(() => {
						neko.sendMessage(from, '*➸ Jawaban :* ' + anu.result.jawaban, text, { quoted: El })
					}, 30000) // 1000 = 1s,
					setTimeout(() => {
						neko.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout(() => {
						neko.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout(() => {
						neko.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout(() => {
						neko.sendMessage(from, tebak, image, { caption: '_Jawab Ye, Gak Bisa Jawab\nHarus Donasi_', quoted: El })
					}, 0) // 1000 = 1s,
					break
				case 'caklontong':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					anu = await fetchJson(`https://api.vhtear.com/funkuis&apikey=${vhtear}`)
					setTimeout(() => {
						neko.sendMessage(from, '*➸ Jawaban :* ' + anu.result.jawaban + '\n' + anu.result.desk, text, { quoted: El })
					}, 30000) // 1000 = 1s,
					setTimeout(() => {
						neko.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout(() => {
						neko.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout(() => {
						neko.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 1000) // 1000 = 1s,
					setTimeout(() => {
						neko.sendMessage(from, anu.result.soal, text, { quoted: El })
					}, 0) // 1000 = 1s,
					break

				case 'bisakah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					bisakah = body.slice(1)
					const bisa = ['Tentu Saja Bisa! Kamu Adalah Orang Paling Homky', 'Gak Bisa Ajg Aowkwowk', 'Hmm Gua Gak Tau Yaa, tanya ama bapakau', 'UElgi Tod Gua Ga Paham']
					const keh = bisa[Math.floor(Math.random() * bisa.length)]
					neko.sendMessage(from, 'Pertanyaan : *' + bisakah + '*\n\nJawaban : ' + keh, text, { quoted: El })
					break

	case 'darkneon':
			if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
				
			if (args.length < 1) return reply(`Contoh: ${prefix}darkneon kntl`)
			darkn = body.slice(9)
			darkne = await getBuffer(`https://videfikri.com/api/textmaker/darkneon/?text=${darkn}`)
			neko.sendMessage(from, darkne, image, {quoted: El, caption: 'DARKNEON'})
			await limitAdd(sender)
			break
case 'bisakah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					kapankah = body.slice(1)
					const kapan = ['Besok', 'Lusa', 'Tadi', '4 Hari Lagi', '5 Hari Lagi', '6 Hari Lagi', '1 Minggu Lagi', '2 Minggu Lagi', '3 Minggu Lagi', '1 BuEl Lagi', '2 BuEl Lagi', '3 BuEl Lagi', '4 BuEl Lagi', '5 BuEl Lagi', '6 BuEl Lagi', '1 Tahun Lagi', '2 Tahun Lagi', '3 Tahun Lagi', '4 Tahun Lagi', '5 Tahun Lagi', '6 Tahun Lagi', '1 Abad lagi', '3 Hari Lagi']
					const koh = kapan[Math.floor(Math.random() * kapan.length)]
					neko.sendMessage(from, 'Pertanyaan : *' + kapankah + '*\n\nJawaban : ' + koh, text, { quoted: El })
					break
        
					case 'watak':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					watak = body.slice(1)
					const wa =['Penyayang','Pemurah','Pemarah','Pemaaf','Penurut','Baik','Baperan','Baik Hati','penyabar','UwU','top deh, pokoknya','Suka Membantu']
					const tak = wa[Math.floor(Math.random() * wa.length)]
					neko.sendMessage(from, 'Pertanyaan : *'+watak+'*\n\nJawaban : '+ tak, text, { quoted: El })
				    break
				case 'apakah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					apakah = body.slice(1)
					const apa = ['Iya', 'Tidak', 'Bisa Jadi', 'UElgi bro gak paham']
					const kah = apa[Math.floor(Math.random() * apa.length)]
					neko.sendMessage(from, 'Pertanyaan : *' + apakah + '*\n\nJawaban : ' + kah, text, { quoted: El })
					break

				case 'rate':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					rate = body.slice(1)
					const ra = ['4', '9', '17', '28', '34', '48', '59', '62', '74', '83', '97', '100', '29', '94', '75', '82', '41', '39']
					const te = ra[Math.floor(Math.random() * ra.length)]
					neko.sendMessage(from, 'Pertanyaan : *' + rate + '*\n\nJawaban : ' + te + '%', text, { quoted: El })
					break

				case 'hobby':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					hobby = body.slice(1)
					const hob = ['Desah Di Game', 'Ngocokin Doi', 'Stalking sosmed nya mantan', 'Kau kan gak punya hobby awokawok', 'Memasak', 'Membantu Atok', 'Mabar', 'Nobar', 'Sosmedtan', 'Membantu Orang lain', 'Nonton Anime', 'Nonton Drakor', 'Naik Motor', 'Nyanyi', 'Menari', 'Bertumbuk', 'Menggambar', 'Foto fotoan Ga jelas', 'Maen Game', 'Berbicara Sendiri']
					const by = hob[Math.floor(Math.random() * hob.length)]
					neko.sendMessage(from, 'Pertanyaan : *' + hobby + '*\n\nJawaban : ' + by, text, { quoted: El })
					break

				case 'truth':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					const trut = ['Pernah suka sama siapa aja? berapa lama?', 'Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)', 'apa ketakutan terbesar kamu?', 'pernah suka sama orang dan merasa orang itu suka sama kamu juga?', 'Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?', 'pernah gak nyuri uang nyokap atau bokap? Alesanya?', 'hal yang bikin seneng pas lu lagi sedih apa', 'pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?', 'pernah jadi selingkuhan orang?', 'hal yang paling ditakutin', 'siapa orang yang paling berpengaruh kepada kehidupanmu', 'hal membanggakan apa yang kamu dapatkan di tahun ini', 'siapa orang yang bisa membuatmu sange', 'siapa orang yang pernah buatmu sange', '(bgi yg muslim) pernah ga solat seharian?', 'Siapa yang paling mendekati tipe pasangan idealmu di sini', 'suka mabar(main bareng)sama siapa?', 'pernah nolak orang? alasannya kenapa?', 'Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget', 'pencapaian yang udah didapet apa aja ditahun ini?', 'kebiasaan terburuk lo pas di sekolah apa?']
					const ttrth = trut[Math.floor(Math.random() * trut.length)]
					truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					neko.sendMessage(from, truteh, image, { caption: '*Truth*\n\n' + ttrth, quoted: El })
					break

				case 'dare':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					const dare = ['Kirim pesan ke mantan kamu dan biElg "aku masih suka sama kamu', 'telfon crush/pacar sekarang dan ss ke pemain', 'pap ke salah satu anggota grup', 'BiElg "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo', 'ss recent call whatsapp', 'drop emot 🤥 setiap ngetik di gc/pc selama 1 hari', 'kirim voice note biElg can i call u baby?', 'drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu', 'pake foto sule sampe 3 hari', 'ketik pake bahasa daerah 24 jam', 'ganti nama menjadi "gue anak lucinta luna" selama 5 jam', 'chat ke kontak wa urutan sesuai %batre kamu, terus biElg ke dia "i lucky to hv you', 'prank chat mantan dan biElg " i love u, pgn balikan', 'record voice baca surah al-kautsar', 'biElg "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini', 'sebutkan tipe pacar mu!', 'snap/post foto pacar/crush', 'teriak gajelas lalu kirim pake vn kesini', 'pap mukamu lalu kirim ke salah satu temanmu', 'kirim fotomu dengan caption, aku anak pungut', 'teriak pake kata kasar sambil vn trus kirim kesini', 'teriak " anjimm gabutt anjimmm " di depan rumah mu', 'ganti nama jadi " BOWO " selama 24 jam', 'Pura pura kerasukan, contoh : kerasukan maung, kerasukan belaElg, kerasukan kulkas, dll']
					const der = dare[Math.floor(Math.random() * dare.length)]
					tod = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					neko.sendMessage(from, tod, image, { quoted: El, caption: '*Dare*\n\n' + der })
					break

				case 'cekbapak': // By Noel
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					const bapak = ['WAH ADA YTEAM AWOKAWOK', 'Wah Mantap Lu Masih Punya Bapack\nPasti Bapack Nya Kuli :v\nAwowkwokwwok\n#CandabOs', 'Aowkwwo Disini Ada Yteam :v\nLu Yteam Bro? Awowkwowk\nSabar Bro Ga Punya Bapack\n#Camda', 'Bjir Bapack Mu Ternyata Sudah Cemrai\nSedih Bro Gua Liatnya\nTapi Nih Tapi :v\nTetep Ae Lu Yteam Aowkwowkw Ngakak :v', 'Jangan #cekbapak Mulu Broo :v\nKasian Yang Yteam\nNtar Tersinggung Kan\nYahahaha Hayyuk By : Noel']
					const cek = bapak[Math.floor(Math.random() * bapak.length)]
					neko.sendMessage(from, cek, text, { quoted: El })
					break

				case 'randommenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const random = `「 *RANDOM MENU* 」
❏ ${prefix}gachacewek
❏ ${prefix}gachacowok
❏ ${prefix}sagiri
❏ ${prefix}megumin
❏ ${prefix}waifu
❏ ${prefix}neko
❏ ${prefix}shinobu
❏ ${prefix}Loli
❏ ${prefix}nekonime
❏ ${prefix}darkjokes
❏ ${prefix}meme
❏ ${prefix}estetik

「 *${botName}* 」`
					fakestatus(random)
					case 'cecan':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					if (!isGroup) return reply(nad.groupo())
			anu = await fetchJson(`https://api.vhtear.com/pinterest?query=Cewe+Cantik&apikey=nekobotofficial`, {method: 'get'})
					var mi = JSON.parse(JSON.stringify(anu.result));
					var ku =  mi[Math.floor(Math.random() * mi.length)];
					nye = await getBuffer(ku)
					neko.sendMessage(from, nye, image, { caption: 'MHEWEWEW', quoted: El })
					break
				case 'cogan':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					if (!isGroup) return reply(nad.groupo())
			anu = await fetchJson(`https://api.vhtear.com/pinterest?query=Orang+Ganteng&apikey=nekobotofficial`, {method: 'get'})
					var mi = JSON.parse(JSON.stringify(anu.result));
					var ku =  mi[Math.floor(Math.random() * mi.length)];
					nye = await getBuffer(ku)
					neko.sendMessage(from, nye, image, { caption: 'Anjay Ganteng', quoted: El })
					break
				
				
				case 'meme':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					reply(nad.wait())
					mimi = await getBuffer(`https://api.xteam.xyz/randomimage/meme?APIKEY=${xteam}`)
					neko.sendMessage(from, mimi, image, { quoted: El })
					break

				//case 'darkjokes':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					data = fs.readFileSync('./ANDRE/darkjokes.js');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					hasil = await getBuffer(randKey.result)
					sendImage(hasil, El, '*GELAP BOS :V*')
					break
			case 'waifu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					reply(nad.wait())
				    try {
						axios.get(`https://waifu.pics/api/sfw/waifu`).then((res)=>{
						imageToBase64(res.data.url)
						.then((response) => {
						var ifu = Buffer.from(response, 'base64');
					neko.sendMessage(from, ifu, image, {quoted: El, caption: "Wibu AbiZzz"})
					})})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Error!')
					}
					break
			case 'neko':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					reply(nad.wait())
				    try {
						axios.get(`https://waifu.pics/api/sfw/neko`).then((res)=>{
						imageToBase64(res.data.url)
						.then((response) => {
						var ifu = Buffer.from(response, 'base64');
					neko.sendMessage(from, ifu, image, {quoted: El})
					})})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Error!')
					}
					break
			case 'megumin':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					reply(nad.wait())
				    try {
						axios.get(`https://waifu.pics/api/sfw/megumin`).then((res)=>{
						imageToBase64(res.data.url)
						.then((response) => {
						var ifu = Buffer.from(response, 'base64');
					neko.sendMessage(from, ifu, image, {quoted: El})
					})})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Error!')
					}
					break
			case 'shinobu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					reply(nad.wait())
				    try {
						axios.get(`https://waifu.pics/api/sfw/shinobu`).then((res)=>{
						imageToBase64(res.data.url)
						.then((response) => {
						var ifu = Buffer.from(response, 'base64');
					neko.sendMessage(from, ifu, image, {quoted: El})
					})})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Error!')
					}
					break
				//case 'Loli':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					reply(nad.wait())
					lomli = await getBuffer(`https://docs-jojo.herokuapp.com/api/randomLoli`)
					neko.sendMessage(from, lomli, image, { quoted: El, caption: 'Cintai Loli Mu>_<' })
					break

				case 'nekonime':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					anu = await fetchJson(`http://api.lolhuman.xyz/api/random2/neko?apikey=NEKOBOT`)
					reply(nad.wait())
					neko = await getBuffer(anu.result.url_gbr)
					neko.sendMessage(from, neko, image, { quoted: El, caption: 'Nekonime >_<' })
					break

				case 'sagiri':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					sagi = await getBuffer(`http://api.lolhuman.xyz/api/random/sagiri?apikey=NEKOBOT`)
					reply(nad.wait())
					neko.sendMessage(from, sagi, image, { quoted: El })
					break
				case 'estetik':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					if (!isGroup) return reply(nad.groupo())
			anu = await fetchJson(`https://api.vhtear.com/pinterest?query=Pemandangan+Estetik&apikey=nekobotofficial`, {method: 'get'})
					var mi = JSON.parse(JSON.stringify(anu.result));
					var ku =  mi[Math.floor(Math.random() * mi.length)];
					nye = await getBuffer(ku)
					neko.sendMessage(from, nye, image, { caption: 'MHEWEWEW', quoted: El })
					break
					
			
					               case 'ganteng':
				
				if (!isRegistered) return reply(ind.noregis())
				if (isBanned) return reply('Maaf kamu sudah terbenned!')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf kamu sudah terbenned!')
					jds = []
					const jdiidc = groupMembers
					const kosstc = groupMembers
					const akuutc = jdiidc[Math.floor(Math.random() * jdiidc.length)]
					teks = `Yang terganteng di grub ini adalah @${akuutc.jid.split('@')[0]}`
					jds.push(akuutc.jid)
					mentions(teks, jds, true)
				
					break	
               case 'cantik':
				
				if (!isRegistered) return reply(ind.noregis())
				if (isBanned) return reply('Maaf kamu sudah terbenned!')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf kamu sudah terbenned!')
					jds = []
                    const kn = groupMembers
					const nt = groupMembers
					const ik = kan[Math.floor(Math.random() * kn.length)]
					teks = `Yang tercantik di grub ini adalah @${ik.jid.split('@')[0]}`
										jds.push(ik.jid)
					mentions(teks, jds, true)
					break	
					
					      case 'gay':
				
				if (!isRegistered) return reply(ind.noregis())
				if (isBanned) return reply('Maaf kamu sudah terbenned!')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf kamu sudah terbenned!')
					jds = []
                    const ha = groupMembers
					const jing = groupMembers
					const tod = ha[Math.floor(Math.random() * ha.length)]
					teks = `gay di grub ini adalah @${tod.jid.split('@')[0]}`
										jds.push(tod.jid)
					mentions(teks, jds, true)
					break
					   case 'kangcoli':
				
				if (!isRegistered) return reply(ind.noregis())
				if (isBanned) return reply('Maaf kamu sudah terbenned!')
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (isBanned) return reply('Maaf kamu sudah terbenned!')
					jds = []
                    const co = groupMembers
					const li = groupMembers
					const tt = co[Math.floor(Math.random() * co.length)]
					teks = `Yang tercantik di grub ini adalah @${tt.jid.split('@')[0]}`
										jds.push(tt.jid)
					mentions(teks, jds, true)
					break	
					
				
					
				
				case 'dompetmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const dompet = `「 *DOMPET MENU* 」
❏ ${prefix}limit
❏ ${prefix}transfer
❏ ${prefix}atm
❏ ${prefix}buylimit
❏ ${prefix}premiumlist

「 *${botName}* 」`
					fakestatus(dompet)
					break

				case 'limit':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					checkLimit(sender)
					break

				case 'transfer':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q.includes('|')) return reply(nad.wrongf())
					const tujuan = q.substring(0, q.indexOf('|') - 1)
					const jumblah = q.substring(q.lastIndexOf('|') + 1)
					if (checkATMuser(sender) < jumblah) return reply(`uang mu tidak mencukupi untuk melakukan transfer`)
					 if(isNaN(jumblah)) return await reply('jumlah harus berupa angka!!')
                if (jumblah < 1 ) return reply(`minimal transfer 1`)
				const tujuantf = `${tujuan.replace("@", '')}@s.whatsapp.net`
					fee = 0.0001 * jumblah
					hasiltf = jumblah - fee
					addKoinUser(tujuantf, hasiltf)
					confirmATM(sender, jumblah)
					addKoinUser(`${ownerNumber}`, fee)
					reply(`*「 SUKSES 」*\n\npengiriman uang berhasil\n➸ dari : +${sender.split("@")[0]}\n➸ ke : +${tujuan}\n➸ jumlah transfer : ${jumblah}\n➸ pajak : ${fee}`)
					break

				case 'atm':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const kantong = checkATMuser(sender)
					reply(nad.uangkau(pushname, sender, kantong))
					break

				case 'buylimit':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					payout = body.slice(10)
					const koinPerlimit = 1000
					const total = koinPerlimit * payout
					if (checkATMuser(sender) <= total) return reply(`maaf kak uang nya gak cukup, kumpulin uang nya dumlu >_< jangan open bo kak:v`)
					if (checkATMuser(sender) >= total) {
						confirmATM(sender, total)
						bayarLimit(sender, payout)
						await reply(`*「 PEMBAYARAN BERHASIL 」*\n\n➸ pengirim : Noel\n➸ penerima : ${pushname}\n➸ nominal pembelian : ${payout} \n➸ harga limit : ${koinPerlimit}/limit\n➸ sisa uang : ${checkATMuser(sender)}\n\nproses berhasil dengan SN\n${createSerial(15)}`)
					}
					break
				case 'toolsmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const tools = `「 *TOOLS MENU* 」
❏ ${prefix}tomp3
❏ ${prefix}tomp4
❏ ${prefix}toptt
❏ ${prefix}toimg
❏ ${prefix}imgtourl
❏ ${prefix}trigered
❏ ${prefix}komenyt
❏ ${prefix}nightcore
❏ ${prefix}slow
❏ ${prefix}tupai
❏ ${prefix}blub
❏ ${prefix}gemuk
❏ ${prefix}ghost
❏ ${prefix}bass

「 *${botName}* 」`
					fakestatus(tools)
					break
				case 'tomp3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					neko.updatePresence(from, Presence.composing)
					if (!isQuotedVideo) return reply('Reply Video Nya Kak')
					reply(nad.wait())
					encmedia = JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					media = await neko.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal Kak Coba UElgi:)')
						mhee = fs.readFileSync(ran)
						neko.sendMessage(from, mhee, audio, { mimetype: 'audio/mp4', quoted: El })
						fs.unlinkSync(ran)
					})
					break

				case 'toimg':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!isQuotedSticker) return reply('Reply Sticker Nya Kak')
					reply(nad.wait())
					encmedia = JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					media = await neko.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply(nad.stikga())
						buffer = fs.readFileSync(ran)
						neko.sendMessage(from, buffer, image, { quoted: El, caption: 'nih kak [(^.^)]' })
						fs.unlinkSync(ran)
					})
					break

                case 'tomp4':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					reply(nad.wait())
                    var imgbb = require('imgbb-uploader')
                    if ((isMedia && !El.message.videoMessage || isQuotedSticker) && args.length == 0) {
                        ger = isQuotedSticker ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
                        owgi = await neko.downloadAndSaveMediaMessage(ger)
                        data = await imgbb("7f2cf4cd570b9a442d6fdec16b74dcfc", owgi)
                        axios.get(`https://ezgif.com/webp-to-mp4?url=${data.display_url}`)
                            .then(({ data }) => {
                                $ = cheerio.load(data)
                                bodyFormThen = new FormData()
                                file = $('input[name="file"]').attr('value')
                                token = $('input[name="token"]').attr('value')
                                convert = $('input[name="file"]').attr('value')
                                gotdata = {
                                    file: file,
                                    token: token,
                                    convert: convert
                                }
                                bodyFormThen.append('file', gotdata.file)
                                bodyFormThen.append('token', gotdata.token)
                                bodyFormThen.append('convert', gotdata.convert)
                                axios({
                                    method: 'post',
                                    url: 'https://ezgif.com/webp-to-mp4/' + gotdata.file,
                                    data: bodyFormThen,
                                    headers: {
                                        'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                                    }
                                }).then(({ data }) => {
                                    $ = cheerio.load(data)
                                    result = 'https:' + $('div#output > p.outfile > video > source').attr('ANDRE')
                                    getBuffer(result).then(tog => {
                                        neko.sendMessage(from, tog, video, { mimetype: 'video/mp4', quoted: El })
                                    })
                                })
                            })
                    } else {
                        reply('Reply StickerGif nya!')
                    }
                    break
                    
				case 'imgtourl':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					costum('[WAIT] Sabar Kak', text, tescuk, cr)
					var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
					var media = await neko.downloadAndSaveMediaMessage(encmedia)
					var imgbb = require('imgbb-uploader')
					imgbb('2e07d39997e8b3b16ac0318aa714e353', media)
						.then(data => {
							var caps = `「 *IMAGE TO URL* 」
➸ ID : ${data.id}
➸ MimeType : ${data.image.mime}
➸ Extension : ${data.image.extension}
➸ URL : ${data.display_url}`
							ibb = fs.readFileSync(media)
							neko.sendMessage(from, ibb, image, { quoted: El, caption: caps })
						})
						.catch(err => {
							throw err
						})
					break

				case 'komenyt':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					gh = body.slice(9)
					usnm = gh.split("&")[0];
					cmn = gh.split("&")[1];
					var imgbb = require('imgbb-uploader')
					try {
						pp = await neko.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
					} catch {
						pp = 'https://i.ibb.co/Tv6JR98/baby.jpg'
					}
					media = await getBuffer(pp)
					datae = await imageToBase64(JSON.stringify(pp).replace(/\"/gi, ''))
					fs.writeFileSync('getpp.jpeg', datae, 'base64')
					res = await imgbb("7f2cf4cd570b9a442d6fdec16b74dcfc", 'getpp.jpeg')
					buffer = await getBuffer(`https://some-random-api.ml/canvas/youtube-comment?avatar=${res.display_url}&comment=${cmn}&username=${usnm}`)
					neko.sendMessage(from, buffer, image, { caption: 'Nih Cok', contextInfo: { participant: '0@s.whatsapp.net', quotedMessage: { conversation: '*_YOUTUBE COMMENT_*' } } })
					break

				case 'trigered':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !El.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
						reply(nad.wait())
						owgi = await neko.downloadAndSaveMediaMessage(ger)
						anu = await imgbb("7f2cf4cd570b9a442d6fdec16b74dcfc", owgi)
						trig = `${anu.display_url}`
						ranp = getRandom('.gif')
						rano = getRandom('.webp')
						anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${trig}`
						exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
							fs.unlinkSync(ranp)
							if (err) return reply('GAGAL UM')
							nobg = fs.readFileSync(rano)
							neko.sendMessage(from, nobg, sticker, { quoted: El })
							fs.unlinkSync(rano)
						})
					} else {
						reply('Gunakan Foto Kakm')
					}
					break
					
						case 'stikerwm':
	case 'stickerwm':
    case 'swm':
            pe = args.join('')
            var a = pe.split("|")[0];
            var b = pe.split("|")[1];
            if (isMedia && neko.message.videoMessage || isQuotedImage ) {
            const encmedia = isQuotedImage   ? JSON.parse(JSON.stringify(neko).replace('quotedM','m')).message.extendedTextMessage.contextInfo : neko
             media = await neko.downloadAndSaveMediaMessage(encmedia)
            await createExif(a,b)
            out = getRandom('.webp')
            ffmpeg(media)
            .on('error', (e) => {
            console.log(e)
            neko.sendMessage(from, 'Terjadi kesalahan', 'conversation', { quoted: neko })
            fs.unlinkSync(media)
            })
            .on('end', () => {
            _out = getRandom('.webp')
            spawn('webpmux', ['-set','exif','./stik/data.exif', out, '-o', _out])
            .on('exit', () => {
            neko.sendMessage(from, fs.readFileSync(_out),'stickerMessage', { quoted: neko })
            fs.unlinkSync(out)
            fs.unlinkSync(_out)
            fs.unlinkSync(media)
            })
            })
            .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(out) 
            } else if ((isMedia && neko.message.videoMessage.seconds < 11 || isQuotedVideo && neko.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
            const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(neko).replace('quotedM','m')).message.extendedTextMessage.contextInfo : neko
            const media = await neko.downloadAndSaveMediaMessage(encmedia)
            pe = args.join('')
            var a = pe.split("|")[0];
            var b = pe.split("|")[1];
            await createExif(a,b)
            out = getRandom('.webp')
            ffmpeg(media)
            .on('error', (e) => {
            console.log(e)
            neko.sendMessage(from, 'Terjadi kesalahan', 'conversation', { quoted: neko })
            fs.unlinkSync(media)
            })
            .on('end', () => {
            _out = getRandom('.webp')
            spawn('webpmux', ['-set','exif','./stik/data.exif', out, '-o', _out])
            .on('exit', () => {
            neko.sendMessage(from, fs.readFileSync(_out),'stickerMessage', { quoted: neko })
            fs.unlinkSync(out)
            fs.unlinkSync(_out)
            fs.unlinkSync(media)
            })
            })
            .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(out)       
            } else {
            reply(`Kirim gambar dengan caption ${prefix}swm teks|teks atau tag gambar yang sudah dikirim`)
            }
            break
					
					
					
					
					
					
			    case 'nightcore':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)			    
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(El).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await neko.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					neko.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: El, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'slow':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(El).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await neko.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					neko.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: El, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'tupai':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(El).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await neko.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					neko.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: El, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'blub':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(El).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await neko.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.9,asetrate=95100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					neko.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: El, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'gemuk':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(El).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await neko.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					neko.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: El, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'ghost':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(El).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await neko.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=3486" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						ghs = fs.readFileSync(ran)
					neko.sendMessage(from, ghs, audio, { mimetype: 'audio/mp4', quoted: El, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
		        case 'bass':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)		   
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(El).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await neko.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=64:width_type=o:width=2:g=56 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					neko.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: El, ptt: true })
						fs.unlinkSync(ran)
					   })
				       break
	             case 'toptt':
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(El).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await neko.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal mengkonversi audio ke ptt')
						topt = fs.readFileSync(ran)
					neko.sendMessage(from, topt, audio, { mimetype: 'audio/mp4', quoted: El, ptt: true })
						})
						await limitAdd(sender)
					    break
				case 'mutualmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const mtal = `「 *MUTUAL MENU* 」
❏ ${prefix}mutual
❏ ${prefix}next

「 *${botName}* 」`
					fakestatus(mtal)
					break
				case 'mutual':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (isGroup) return reply('Maaf Kak Tidak Bisa Di Group')
					anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net', '')
					await reply('Mencari Pasangan >_<')
					await reply(`wa.me/${anug}`)
					await reply(`Pasangan Ditemukan :\n*${prefix}next* — Temukan Pasangan Baru`)
					break

				case 'next':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (isGroup) return reply('Maaf Kak Tidak Bisa Di Group')
					anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net', '')
					await reply('Mencari Pasangan >_<')
					await reply(`wa.me/${anug}`)
					await reply(`Pasangan Ditemukan :\n*${prefix}next* — Temukan Pasangan Baru`)
					break
					
				case 'othermenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const other = `「 *OTHER MENU* 」
❏ ${prefix}lacakip
❏ ${prefix}brainly
❏ ${prefix}wiki
❏ ${prefix}kbbi
❏ ${prefix}covid
❏ ${prefix}pinterest
❏ ${prefix}ytsearch
❏ ${prefix}jadwalsholat
❏ ${prefix}spamsms

「 *${botName}* 」`
					fakestatus(other)
					break
				/*	//case 'spamsms':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (args[0].startsWith('08')) return reply('Gunakan kode bahasa kak')
					await fetchJson(`https://api.xteam.xyz/spammer/pizzahut?no=${q}&APIKEY=${xteam}`)
					await fetchJson(`https://api.xteam.xyz/spammer/olx?no=${q}&APIKEY=${xteam}`)
					await fetchJson(`https://api.xteam.xyz/spammer/jagreward?no=${q}&APIKEY=${xteam}`)
					await fetchJson(`https://api.xteam.xyz/spammer/danacita?no=${q}&APIKEY=${xteam}`)
					await fetchJson(`https://api.xteam.xyz/spammer/akademi?no=${q}&APIKEY=${xteam}`)
					await fetchJson(`https://api.xteam.xyz/spammer/icq?no=${q}&APIKEY=${xteam}`)
					reply('Done')
                    break
              case 'ytsearch': 
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
				neko.updatePresence(from, Presence.composing) 
				if (args.length < 1) return reply(`mau nyari apaan bwang di yt?`) 
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/ytsearch?q=${body.slice(9)}&apikey=OnlyDevCity01`)
				njuk = '=================\n'
				for (let i of anu.results) {
					njuk += `*Channel :* ${i.channel}\n*Judul* : ${i.title}\n*Link* : ${i.urlyt}\n*Duration* : ${i.duration}\n*ID* : ${i.id}\n*Views* : ${i.views}\n=================\n`
				}
				fakestatus(njuk)
				break
				case 'lacakip':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length === 0) return reply(`Contoh :\n${prefix}lacakip 10.43.180.140`)
					iplu = `${body.slice(9)}`
					data = await fetchJson(`https://videfikri.com/api/iplookup/?ip=${iplu}`, { method: 'get' })
					lacaks = data.result
					lacak = `➸ Ip : ${lacaks.ip}
➸ Country : ${lacaks.country}
➸ Country code : ${lacaks.country_code}
➸ Region : ${lacaks.region}
➸ Region name : ${lacaks.region_name}
➸ City : ${lacaks.city}
➸ Latitude : ${lacaks.latitude}
➸ Longtitude : ${lacaks.longtitude}
➸ Timezone : ${lacaks.timezone}
➸ Isp : ${lacaks.isp}
➸ Org : ${lacaks.org}
➸ As : ${lacaks.as}`
					neko.sendMessage(from, lacak, text, { quoted: El })
					break

				case 'brainly':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					if (args.length < 1) return reply(`Yang Mau Dicari Apa Kak?\nContoh :\n${prefix}brainly apa itu penis`)
					await limitAdd(sender)
					brien = body.slice(9)
					brainly(`${brien}`).then(res => {
						teks = '♡───────────♡\n'
						for (let Y of res.data) {
							teks += `\n*「 BRAINLY 」*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n♡───────────♡\n`
						}
						neko.sendMessage(from, teks, text, { quoted: El, detectLinks: false })
						console.log(res)
					})
					break

				case 'wiki':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Yang Mau Dicari Apa Kak?\nContoh :\n${prefix}wiki online`)
					var bby = body.slice(6)
					anu = await fetchJson(`https://api.zeks.xyz/api/wiki?q=${bby}&apikey=apivinz`)
					reply('[WAIT] Sedang Searching...')
					wikiped = `「 WIKI PEDIA 」\n Jawaban : ${anu.result.result}`
					neko.sendMessage(from, wikiped, text, { quoted: El })
					break

				case 'kbbi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Yang Mau Dicari Apa Kak?\nContoh :\n${prefix}kbbi manusia`)
					var bby = body.slice(6)
					anu = await fetchJson(`https://videfikri.com/api/kbbi/?query=${bby}`)
					reply('[WAIT] Sedang Searching...')
					kabebei = `「 *KBBI* 」\nJawaban : ${anu.result.hasil}`
					neko.sendMessage(from, kabebei, text, { quoted: El })
					break
					
				case 'covid':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					anu = await fetchJson(`https://videfikri.com/api/covidindo/`)
					cvd = `「 *INGFO COVID* 」

Negara : ${anu.result.country}
Positif : ${anu.result.positif}
Sembuh : ${anu.result.sembuh}
Meninggal : ${anu.result.meninggal}`
					neko.sendMessage(from, cvd, text, { quoted: El })
					break
					
				case 'pinterest':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					neko.updatePresence(from, Presence.composing)
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${body.slice(11)}`, { method: 'get' })
					reply(nad.wait())
					n = JSON.parse(JSON.stringify(data));
					nineko = n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nineko)
					neko.sendMessage(from, pok, image, { quoted: El, caption: `*PINTEREST*` })
					break*/
				
				  case 'cuaca':
		if (!isRegistered) return reply(ind.noregis())
                    if (args.length == 0) return reply(`Example: ${prefix + command} Yogyakarta`)
                    daerah = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/cuaca/${daerah}?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Tempat : ${get_result.tempat}\n`
                    ini_txt += `Cuaca : ${get_result.cuaca}\n`
                    ini_txt += `Angin : ${get_result.angin}\n`
                    ini_txt += `Description : ${get_result.description}\n`
                    ini_txt += `Kelembapan : ${get_result.kelembapan}\n`
                    ini_txt += `Suhu : ${get_result.suhu}\n`
                    ini_txt += `Udara : ${get_result.udara}\n`
                    ini_txt += `Permukaan laut : ${get_result.permukaan_laut}\n`
                    neko.sendMessage(from, { degreesLatitude: get_result.latitude, degreesLongitude: get_result.longitude }, location, { quoted: El})
                    reply(ini_txt)
                    break
				case 'storagemenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const storage = `「 *STORAGE* 」
❏ ${prefix}addstiker
❏ ${prefix}getstiker
❏ ${prefix}liststiker
❏ ${prefix}addvideo
❏ ${prefix}getvideo
❏ ${prefix}listvideo
❏ ${prefix}addvn
❏ ${prefix}getvn
❏ ${prefix}listvn
❏ ${prefix}addimage
❏ ${prefix}getimage
❏ ${prefix}listimage
❏ ${prefix}iri
❏ ${prefix}pale
❏ ${prefix}pota
❏ ${prefix}welot
❏ ${prefix}alay
❏ ${prefix}bernyanyi
❏ ${prefix}bwa
❏ ${prefix}ganteng
❏ ${prefix}gatal
❏ ${prefix}ladida
❏ ${prefix}rusher
❏ ${prefix}boong
❏ ${prefix}tengteng
❏ ${prefix}sound1
❏ ${prefix}sound2
❏ ${prefix}sound3
❏ ${prefix}sound4
❏ ${prefix}sound5
❏ ${prefix}sound6
❏ ${prefix}sound7

「 *${botName}* 」`
					fakestatus(storage)
					break
				case 'addstiker':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedSticker) return reply('Reply stickernya kak -_-')
					stikEl = body.slice(11)
					if (!stikEl) return reply('Namain Stickernya kak!')
					adds = JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					El = await neko.downloadMediaMessage(adds)
					setimker.push(`${stikEl}`)
					fs.writeFileSync(`./media/sticker/${stikEl}.webp`, El)
					fs.writeFileSync(`./media/stik.json`, JSON.stringify(setimker))
					await reply('Sticker Berhasil Ditambahkan Ke Database Bot')
					break

				case 'getstiker':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Nama Stiker Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}liststiker`)
					stikeram = body.slice(11)
					hasilya = fs.readFileSync(`./media/sticker/${stikeram}.webp`)
					neko.sendMessage(from, hasilya, sticker, { quoted: El })
					break

				case 'liststiker':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					lis = '╭──「 *LIST STICKER* 」\n'
					for (let cieee of setimker) {
						lis += `◯ ${cieee}\n`
					}
					lis += `\n╰─────「 *${setimker.length}* 」`
					neko.sendMessage(from, lis.trim(), extendedText, { quoted: El, contextInfo: { "mentionedJid": setimker } })
					break

				case 'addvideo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedVideo) return reply('Reply Videonya Kak')
					adv = body.slice(10)
					if (!adv) return reply('Namain video nya kak')
					deo = JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					dvi = await neko.downloadMediaMessage(deo)
					vidioya.push(`${adv}`)
					fs.writeFileSync(`./media/video/${adv}.mp4`, dvi)
					fs.writeFileSync(`./media/video.json`, JSON.stringify(vidioya))
					neko.sendMessage(from, `Video Berhasil Ditambahkan Ke Database Bot`, MessageType.text, { quoted: El })
					break

				case 'getvideo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Nama Video Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}listvideo`)
					getvi = body.slice(10)
					buffer = fs.readFileSync(`./media/video/${getvi}.mp4`)
					neko.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: El })
					break

				case 'listvideo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					list = '╭──「 *LIST VIDEO* 」\n'
					for (let nihh of vidioya) {
						list += `◯ ${nihh}\n`
					}
					list += `\n╰─────「 *${vidioya.length}* 」`
					neko.sendMessage(from, list.trim(), extendedText, { quoted: El, contextInfo: { "mentionedJid": vidioya } })
					break

				case 'addvn':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedAudio) return reply('Reply Vn Nya Kak')
					advn = body.slice(7)
					if (!advn) return reply('Nama vn nya apa?')
					boij = JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await neko.downloadMediaMessage(boij)
					audioya.push(`${advn}`)
					fs.writeFileSync(`./media/audio/${advn}.mp3`, delb)
					fs.writeFileSync('./media/audio.json', JSON.stringify(audioya))
					neko.sendMessage(from, `Vn Berhasil Ditambahkan Ke Database Bot`, MessageType.text, { quoted: El })
					break

				case 'getvn':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Nama Vn Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}listvn`)
					namastc = body.slice(7)
					buffer = fs.readFileSync(`./media/audio/${namastc}.mp3`)
					neko.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: El, ptt: true })
					break

				case 'listvn':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					lisv = '╭──「 *LIST VN* 」\n'
					for (let awokwkwk of audioya) {
						lisv += `◯ ${awokwkwk}\n`
					}
					lisv += `\n╰─────「 *${audioya.length}* 」`
					neko.sendMessage(from, lisv.trim(), extendedText, { quoted: El, contextInfo: { "mentionedJid": audioya } })
					break

				case 'addimage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					sepimg = body.slice(10)
					if (!sepimg) return reply('Nama Gambar Nya Apa?')
					svimeg = JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					imej = await neko.downloadMediaMessage(svimeg)
					imegya.push(`${sepimg}`)
					fs.writeFileSync(`./media/image/${sepimg}.jpeg`, imej)
					fs.writeFileSync('./media/image.json', JSON.stringify(imegya))
					neko.sendMessage(from, `Gambar Berhasil Ditambahkan Ke Database Bot`, MessageType.text, { quoted: El })
					break

				case 'getimage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Nama Gambar Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}listimage`)
					namastc = body.slice(10)
					buffer = fs.readFileSync(`./media/image/${namastc}.jpeg`)
					neko.sendMessage(from, buffer, image, { quoted: El })
					break

				case 'listimage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					lisi = '╭──「 *LIST IMAGE* 」\n'
					for (let menghilih of imegya) {
						lisi += `◯ ${menghilih}\n`
					}
					lisi += `\n╰─────「 *${imegya.length}* 」`
					neko.sendMessage(from, lisi.trim(), extendedText, { quoted: El, contextInfo: { "mentionedJid": imegya } })
					break
			if (budy == '.iri') {
boo = fs.readFileSync('./media/dj/tb.mp3');
neko.sendMessage(from, boo, MessageType.audio, {quoted: El, mimetype: 'audio/mp4', ptt:true})
		}
		if (budy == '.pota') {
ber = fs.readFileSync('./media/dj/pota.mp3');
neko.sendMessage(from, ber, MessageType.audio, {quoted: El, mimetype: 'audio/mp4', ptt:true})
		}
		
				if (budy == '.pale') {
pal = fs.readFileSync('./media/dj/pale.mp3');
neko.sendMessage(from, ber, MessageType.audio, {quoted: El, mimetype: 'audio/mp4', ptt:true})
		}
		if (budy == '.goodlooking') {
tol = fs.readFileSync('./media/dj/goodlooking.mp3');
neko.sendMessage(from, tol, MessageType.audio, {quoted: El, mimetype: 'audio/mp4', ptt:true})
		}
		if (budy == '.oyasumi') {
mi = fs.readFileSync('./media/dj/oyasumi.mp3');
neko.sendMessage(from, mi, MessageType.audio, {quoted: El, mimetype: 'audio/mp4', ptt:true})
		}
		if (budy == '.ohayo') {
yo = fs.readFileSync('./media/dj/ohayo.mp3');
neko.sendMessage(from, yo, MessageType.audio, {quoted: El, mimetype: 'audio/mp4', ptt:true})
		}
		if (budy.includes(`pota`)) {
pot = fs.readFileSync('./media/dj/pota.mp3');
		neko.sendMessage(from, pot, MessageType.audio, { quoted: El, mimetype: 'audio/mp4', ptt: true })}
				if (budy == '.maklemak') {
ak = fs.readFileSync('./media/dj/maklemak.mp3');
neko.sendMessage(from, ak, MessageType.audio, {quoted: El, mimetype: 'audio/mp4', ptt:true})
		}
				                case 'covidindo':
		if (!isRegistered) return reply(ind.noregis())
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/corona/indonesia?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Positif : ${get_result.positif}\n`
                    ini_txt += `Sembuh : ${get_result.sembuh}\n`
                    ini_txt += `Dirawat : ${get_result.dirawat}\n`
                    ini_txt += `Meninggal : ${get_result.meninggal}`
                    reply(ini_txt)
                    break
                case 'covidglobal':
		if (!isRegistered) return reply(ind.noregis())
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/corona/global?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Positif : ${get_result.positif}\n`
                    ini_txt += `Sembuh : ${get_result.sembuh}\n`
                    ini_txt += `Dirawat : ${get_result.dirawat}\n`
                    ini_txt += `Meninggal : ${get_result.meninggal}`
                    reply(ini_txt)
                    break
				
				case 'wallpaper':
if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
                    if (args.length == 0) return reply(`Example: ${prefix + command} Loli`)
                    query = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/wallpaper?apikey=NEKOBOT&query=${query}`)
                    neko.sendMessage(from, ini_buffer, image, { quoted: El})
                    break
                case 'wallpaper2':
		if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
                    if (args.length == 0) return reply(`Example: ${prefix + command} Loli`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/wallpaper2?apikey=NEKOBOT&query=${query}`)
                    ini_buffer = await getBuffer(get_result.result)
                    neko.sendMessage(from, ini_buffer, image, { quoted: El})
                    break
				case 'artinama':
		if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
                    if (args.length == 0) return reply(`Example: ${prefix + command} El Human`)
                    ini_nama = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/artinama?apikey=NEKOBOT&nama=${ini_nama}`)
                    reply(get_result.result)
                    break
                case 'jodoh':
		if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
                    if (args.length == 0) return reply(`Example: ${prefix + command} Tahu & Bacem`)
                    ini_nama = args.join(" ").split("&")
                    nama1 = ini_nama[0]
                    nama2 = ini_nama[1]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/jodoh/${nama1}/${nama2}?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Positif : ${get_result.positif}\n`
                    ini_txt += `Negative : ${get_result.negatif}\n`
                    ini_txt += `Deskripsi : ${get_result.deskripsi}`
                    reply(txt)
                    break
                case 'weton':
		if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
                    if (args.length == 0) return reply(`Example: ${prefix + command} 12 12 2020`)
                    tanggal = args[0]
                    buEl = args[1]
                    tahun = args[2]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/weton/${tanggal}/${buEl}/${tahun}?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Weton : ${get_result.weton}\n`
                    ini_txt += `Pekerjaan : ${get_result.pekerjaan}\n`
                    ini_txt += `Rejeki : ${get_result.rejeki}\n`
                    ini_txt += `Jodoh : ${get_result.jodoh}`
                    reply(ini_txt)
                    break
                //case 'jadian':
		if (!isRegistered) return reply(ind.noregis())
                    if (args.length == 0) return reply(`Example: ${prefix + command} 12 12 2020`)
                    tanggal = args[0]
                    buEl = args[1]
                    tahun = args[2]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/jadian/${tanggal}/${buEl}/${tahun}?apikey=NEKOBOT`)
                    get_result = get_result.result
                    ini_txt = `Karakteristik : ${get_result.karakteristik}\n`
                    ini_txt += `Deskripsi : ${get_result.deskripsi}`
                    reply(ini_txt)
                    break
                case 'tebakumur':
		if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
                    if (args.length == 0) return reply(`Example: ${prefix + command} El Human`)
                    ini_name = args.join(" ")
                    if (args.length == 0) return reply(`Example: ${prefix + command} El Human`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/tebakumur?apikey=NEKOBOT&name=${ini_name}`)
                    get_result = get_result.result
                    ini_txt = `Nama : ${get_result.name}\n`
                    ini_txt += `Umur : ${get_result.age}`
                    reply(ini_txt)
                    break
			
				case 'ownermenu':
					const bosnya = `「 *MENU BOSS* 」
❏ ${prefix}addprem
❏ ${prefix}dellprem
❏ ${prefix}ban
❏ ${prefix}unban
❏ ${prefix}addbadword
❏ ${prefix}delbadword
❏ ${prefix}badwordlist
❏ ${prefix}bc
❏ ${prefix}setreply
❏ ${prefix}setprefix
❏ ${prefix}setbio
❏ ${prefix}setppbot
❏ ${prefix}setthumb
❏ ${prefix}clearall
❏ ${prefix}resetlimit
❏ ${prefix}event
❏ ${prefix}term
❏ ${prefix}return
❏ ${prefix}readall

*ABOUT* 
❏ ${prefix}runtime
❏ ${prefix}creator
❏ ${prefix}donasi
❏ ${prefix}ikEl
❏ ${prefix}ping
❏ ${prefix}info
❏ cekprefix

「 *${botName}* 」`
					fakestatus(bosnya)
					break				
                case 'setthumb':
                if (!isOwner) return reply(nad.ownerb())
                    if (!isQuotedImage) return reply('Reply imagenya NJG!')
                    const messimagethumb = JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    const downiamgethumb = await neko.downloadMediaMessage(messimagethumb)
                    fs.unlinkSync(`./src/image/thumbnail.jpeg`)
                    await sleep(2000)
                    fs.writeFileSync(`./src/image/thumbnail.jpeg`, downiamgethumb)
                    reply('Succes')
                    break
				
								case 'join':
				                if (!isOwner) return reply(nad.ownerb())
				
					neko.query({
json:["action", "invite", `${args[0].replace('https://chat.whatsapp.com/','')}`]
})
sendFakeStatus(from, `Succes Bergabung Dalam Group`)
break
				case 'setppbot':
				neko.updatePresence(from, Presence.composing)
				if (!isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix}setbotpp atau tag gambar yang sudah dikirim`)
					if (!isOwner) return reply(nad.ownerb())
					enmedia = JSON.parse(JSON.stringify(El).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await neko.downloadAndSaveMediaMessage(enmedia)
					await neko.updateProfilePicture(botNumber, media)
					reply('Makasih profil barunya😗')
					break
                
					//*autoread
					neko.chatRead(from, 'read')
			
			neko.chatRead(from, 'totalchat')
			
			
  
					
				case 'addprem':
					if (!isOwner) return reply(nad.ownerb())
					adprem = `${args[0].replace('@', '')}@s.whatsapp.net`
					premium.push(adprem)
					fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
					fakestatus(`BERHASIL MENAMBAHKAN USER PREMIUM`)
					break

				case 'dellprem':
					if (!isOwner) return reply(nad.ownerb())
					delprem = `${args[0].replace('@', '')}@s.whatsapp.net`
					delp = ban.indexOf(delprem)
					premium.splice(delp, 1)
					fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
					fakestatus(`BERHASIL MENGHAPUS USER PREMIUM`)
					break
					
                case 'premiumlist':
				neko.updatePresence(from, Presence.composing) 
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
				pemlist = '╭──「 *USER PREMIUM* 」\n'
				for (let premm of premium) {
					pemlist += `> @${premm.split('@')[0]}\n`
					}
					pemlist += `Total : ${premium.length}`
				neko.sendMessage(from, pemlist.trim(), extendedText, {quoted: El, contextInfo: {"mentionedJid": premium}})
				break
				
				case 'ban':
					if (!isOwner) return reply(nad.ownerb())
					bnnd = `${args[0].replace('@', '')}@s.whatsapp.net`
					ban.push(bnnd)
					fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
					fakestatus(`Nomor ${bnnd} telah dibanned!`)
					break

				case 'unban':
					if (!isOwner) return reply(nad.ownerb())
					ya = `${args[0].replace('@', '')}@s.whatsapp.net`
					unb = ban.indexOf(ya)
					ban.splice(unb, 1)
					fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
					fakestatus(`Nomor ${ya} telah di unban!`)
					break
                   case 'addbadword':
					if (!isOwner) return reply(nad.ownerb())
                    if (args.length < 1) return reply( `Kirim perintah ${prefix}addbadword [kata kasar]. contoh ${prefix}addbadword bego`)
                    const bw = body.slice(12)
                    bad.push(bw)
                    fs.writeFileSync('./database/bad.json', JSON.stringify(bad))
                    reply('Success Menambahkan Bad Word!')
                    break
                case 'delbadword':
					if (!isOwner) return reply(nad.ownerb())
                    if (args.length < 1) return reply( `Kirim perintah ${prefix}addbadword [kata kasar]. contoh ${prefix}addbadword bego`)
                    let dbw = body.slice(12)
                    bad.splice(dbw)
                    fs.writeFileSync('./database/bad.json', JSON.stringify(bad))
                    reply('Success Menghapus BAD WORD!')
                    break 
                case 'listbadword':
                case 'badwordlist':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
                    let lbw = `Ini adalah list BAD WORD\nTotal : ${bad.length}\n`
                    for (let i of bad) {
                        lbw += `➢ ${i.replace(bad)}\n`
                    }
                    await reply(lbw)
                    break
				case 'bc':
					neko.updatePresence(from, Presence.composing)
					if (!isOwner) return reply(nad.ownerb())
					if (args.length < 1) return reply('.......')
					anu = await neko.chats.all()
					if (isMedia && !El.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(El).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : El
						buff = await neko.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							neko.sendMessage(_.jid, buff, image, { caption: `*「 ${botName} BROADCAST 」*\n\n${body.slice(4)}` })
						}
						reply('')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 ${botName} BROADCAST 」*\n\n${body.slice(4)}`)
						}
						reply('*「 SUKSES BOSKU 」*')
					}
					break

				case 'setreply':
					if (!isOwner) return reply(nad.ownerb())
					neko.updatePresence(from, Presence.composing)
					if (args.length < 1) return
					cr = body.slice(10)
					fakestatus(`reply berhasil di ubah menjadi : ${cr}`)
					await limitAdd(sender)
					break					
					
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(nad.ownerb())
					prefix = args[0]
					fakestatus(`*「 SUKSES 」* Prefix jadi ➸ : ${prefix}`)
					break

				case 'setbio':
					if (!isOwner) return reply(nad.ownerb())
					iyek = body.slice(8)
					neko.setStatus(`${iyek}`)
					fakestatus(`Status BOT berhasil diperbarui menjadi :\n*[ ${iyek} ]*`)
					break
					
				 if (budy.startsWith('x')){
try {
return neko.sendMessage(from, JSON.stringify(eval(budy.slice(2)),null,'\t'),text, {quoted: El})
} catch(err) {
e = String(err)
reply(e)
}
}
				case 'clearall':
					if (!isOwner) return reply(nad.ownerb())
					anu = await neko.chats.all()
					neko.setMaxListeners(25)
					for (let _ of anu) {
						neko.deleteChat(_.jid)
					}
					fakestatus(nad.clears())
					break

				case 'resetlimit':
					if (!isOwner) return reply(nad.ownerb())
					var ngonsol = []
					rest = _limit.indexOf([])
					_limit.splice(rest)
					fs.writeFileSync('./database/limit.json', JSON.stringify(ngonsol))
					fakestatus(`LIMIT BERHASIL DI RESET BOS`)
					break

				case 'event':
					if (isBanned) return reply(nad.baned())
					if (!isGroup) return reply(nad.groupo())
					if (!isOwner) return reply(nad.ownerb())
					if (args.length < 1) return reply('Ekhemm >_<')
					if (Number(args[0]) === 1) {
						if (isEventon) return reply('*FITUR EVENT SUDAH AKTIF BOS*')
						event.push(from)
						fs.writeFileSync('./database/event.json', JSON.stringify(event))
						reply('*「 SUKSES 」MENGAKTIFKAN EVENT DI GROUP*')
					} else if (Number(args[0]) === 0) {
						event.splice(from, 1)
						fs.writeFileSync('./database/event.json', JSON.stringify(event))
						reply('*「 SUKSES 」MEMATIKAN EVENT DI GROUP*')
					} else {
						reply('pilih 1/0')
					}
					break

				case 'term':
					if (!isOwner) return reply(nad.ownerB())
					const cmd = body.slice(6)
					var itsme = `0@s.whatsapp.net`
					var split = `EXECUTOR`
					const term = {
						contextInfo: {
							participant: itsme,
							quotedMessage: {
								extendedTextMessage: {
									text: split,
								}
							}
						}
					}
					exec(cmd, (err, stdout) => {
						if (err) return neko.sendMessage(from, `root@Noel:~ ${err}`, text, { quoted: El })
						if (stdout) {
							neko.sendMessage(from, stdout, text, term)
						}
					})
					break

				case 'return':
					return neko.sendMessage(from, JSON.stringify(eval(args.join(''))), text, { quoted: El })
					break
				default:
					if (budy == '@neko') {
						if (isBanned) return reply(nad.baned())
						if (isRegistered) return reply(nad.rediregis())
						const serialUser = createSerial(20)
						veri = sender
						if (isGroup) {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppadd = await neko.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppadd = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							captnya = `╭──「 *VERIFIKASI BERHASIL* 」
➸ Nama : ${pushname}
➸ Nomor : wa.me/${sender.split("@")[0]}
➸ Waktu Verify : ${time}
➸ SN : ${serialUser}
➸ User Verified : ${_registered.length}
╰─────「 *${botName}* 」`
							let peripi = await getBuffer(ppadd)
							neko.sendMessage(from, peripi, image, {
								caption: captnya, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
							addATM(sender)
							addLevelingId(sender)
							console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
						} else {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppadd = await neko.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppadd = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							captnya = `╭──「 *VERIFIKASI BERHASIL* 」
➸ Nama : ${pushname}
➸ Nomor : wa.me/${sender.split("@")[0]}
➸ Waktu Verify : ${time}
➸ SN : ${serialUser}
➸ User Verified : ${_registered.length}
╰─────「 *${botName}* 」`
							let peripi = await getBuffer(ppadd)
							neko.sendMessage(from, peripi, image, {
								caption: captnya, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
						}
						addATM(sender)
						addLevelingId(sender)
						console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
					}
			}
			
			 if (!isGroup && !isCmd) {
                        await neko.updatePresence(from, Presence.composing)
                        simi = await fetchJson(`http://api.lolhuman.xyz/api/simi?apikey=NEKOBOT&text=${budy}`)
                        reply(simi.result)
                    }
					

			if (budy == 'cekprefix') {
				fakestatus(`*${botName} MENGGUNAKAN PREFIX :「 ${prefix} 」*`)
			}
		
			
			if (budy.includes(`@628815887040`)) {
tujuh = fs.readFileSync(`./media/sticker/apasih.webp`)
				neko.sendMessage(from, tujuh, sticker, {quoted: El})
		}
			
					if (budy == '.nekogroup') {
				reply(`https://chat.whatsapp.com/FaO4loyrBGrFNyspZJ0afa`)
			}
			
					if (budy == '.hedsot') {
				reply(`DISABLE BY OWNER`)
			}
				if (budy == '.add') {
				reply(`DISABLE BY OWNER`)
			}
			if (budy == '.kick') {
				reply(`DISABLE BY OWNER`)
			}
			if (budy == 'bot') {
				reply(`IYA, KAKA >//<`)
			}
			if (budy == 'Bot') {
				reply(`IYA, KAKA >//<`)
			}
			if (budy == 'Neko') {
				reply(`HOOH`)
			}
			if (budy == 'neko') {
				reply(`HOOH`)
			}
			if (budy == 'assalamualaikum') {
				reply(`Waalaikumsalam`)
			}
			if (budy == 'Assalamualaikum') {
				reply(`Waalaikumsalam`)
			}
			if (budy == 'Terimakasih') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'terimakasih') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'makasih') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'Thanks') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'thanks') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'Tq') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'tq') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}

			if (isGroup && !isCmd && budy != undefined) {
				console.log(budy)
				//		reply(neko.cmdnf(prefix, command))
			} else {
				console.log(color('[404]', 'red'), 'Unregistered Command from', color(sender.split('@')[0]))
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
