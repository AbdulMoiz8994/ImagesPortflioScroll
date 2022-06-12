import React from 'react';
import { Button } from 'components/button/button';
import { FormattedMessage } from 'react-intl';
import Popover from 'components/popover/popover';
import { AuthorizedMenu } from './authorized-menu';
import { useBreakpointValue } from '@chakra-ui/react';

interface Props {
  isAuthenticated: boolean;
  onJoin: () => void;
  onLogout: () => void;
  avatar: string;
  Icon?: any
}

const AuthMenu = ({ isAuthenticated, onJoin, onLogout, avatar, Icon }: Props) => {
  const screenSize = useBreakpointValue({ base: "mobile", md: "desktop" })

  return !isAuthenticated ? (
    <Button variant="primary" onClick={onJoin}>
      <FormattedMessage id={screenSize === "mobile" ? "nav.join.mobile" : "nav.join"} defaultMessage="Join" />
    </Button>
  ) : (
    <Popover
      direction="right"
      className="user-pages-dropdown"
      handler={Icon ? Icon : <img src={avatar} alt="user" />}
      content={<AuthorizedMenu onLogout={onLogout} />}
    />
  );
};
export default AuthMenu;
