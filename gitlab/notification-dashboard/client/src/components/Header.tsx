import React from 'react';

import { Avatar, Anchor, Nav, Header } from 'grommet';


const gravatarLink =
  '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

export const AppHeader = () => (
  <Header background="light-4" pad="small">
    <Avatar src={gravatarLink} />
    <Nav direction="row">
      <Anchor label="Home" href="#" />
      <Anchor label="Profile" href="#" />
    </Nav>
  </Header>

);
export default AppHeader