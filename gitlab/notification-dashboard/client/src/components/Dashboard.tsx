import React from 'react'
import { Box } from 'grommet'
// import ProjectIssues from './ProjectIssues'
import WebsocketFromServer from './WebsocketFromServer'

export default function Dashboard() {

  return (
    <Box pad='medium'>
      <WebsocketFromServer />
      {/* <ProjectIssues /> */}
    </Box>
  )
}
