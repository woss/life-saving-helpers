import { MessageEmbed } from 'discord.js'
import { Request } from 'express'
import { GitlabPushEvent } from './interfaces'

export function createIssueMessage(event: GitlabPushEvent): MessageEmbed {
  const {
    user: { name: userName, avatar_url },
    project: { name: projectName },
    object_attributes: { url, description, state_id },
  } = event

  const embedMessage = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`${projectName}--Issue--${state_id === 1 ? 'open' : 'closed'}`)
    .setURL(url)
    .setAuthor(userName, avatar_url)
    .setDescription(description)
    .setTimestamp()
    .setFooter(projectName)
  console.log(event)
  return embedMessage
}
export function createNoteMessage(event: GitlabPushEvent): MessageEmbed {
  const {
    user: { name: userName, avatar_url },
    issue,
    project: { name: projectName },
    object_attributes: { url, description },
  } = event
  // inside a command, event listener, etc.
  const embedMessage = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('New comment')
    .setURL(url)
    .setAuthor(userName, avatar_url)
    .setDescription(description)
    .setTimestamp()
    .setFooter(`ISSUE : ${issue?.title}`)
  // .setThumbnail(avatar_url)
  // .addFields(
  //   { name: 'Regular field title', value: 'Some value here' },
  //   { name: '\u200B', value: '\u200B' },
  //   { name: 'Inline field title', value: 'Some value here', inline: true },
  //   { name: 'Inline field title', value: 'Some value here', inline: true },
  // ).addField('Inline field title', 'Some value here', true)
  // .setImage(avatar_url)

  console.log(event)

  return embedMessage
}
