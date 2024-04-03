/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'


const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

const randomAnswers = [
  'It is certain',
  'Hazy, try again',
  'Don’t count on it',
  'It is decidedly so',
  'Ask again later',
  'My reply is no',
  'Without a doubt',
  'Better not tell you now',
  'My sources say no',
  'Yes definitely',
  'Cannot predict now',
  'Outlook not so good',
  'You may rely on it',
  'Concentrate and ask again',
  'Very doubtful',
  'As I see it, yes',
  'Most likely',
  'Outlook good',
  'Yes',
  'Signs point to yes',

]

const getRandomAnswer = () => {
  return randomAnswers[Math.floor(Math.random() * randomAnswers.length)]
}

app.frame('/', (c) => {
  const { status } = c
  const answer = getRandomAnswer()
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          // backgroundImage: 
          //   status === 'response'
          //     ? 'url(https://nfts-dataw.s3.amazonaws.com/magic-8-ball/froggie-on-right.png)'
          //     : 'url(https://nfts-dataw.s3.amazonaws.com/magic-8-ball/froggie-on-left.png)',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'black',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            width: status === "response" ? '70%' : '30%',
            lineHeight: 1.4,
            marginTop: 20,
            marginLeft: 100,
            whiteSpace: 'pre-wrap',
            textAlign: 'center', 
          }}
        >
          {status === 'response'
            ? `${answer}`
            : ''}
        </div>
        <div
          style={{
            color: 'black',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            width: status === "response" ? '30%' : '70%',
            lineHeight: 1.4,
            marginTop: 20,
            marginRight: 100,
            whiteSpace: 'pre-wrap',
            textAlign: 'center', 
          }}>
            {status !== 'response'
            ? 'Hey, fren. Ask me any yes/no question...'
            : ''}
        </div>
      </div>
    ),
    intents: [
      <Button value="frogs">{status === "response" ? "Boop again" : "Boop the frog"}</Button>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
