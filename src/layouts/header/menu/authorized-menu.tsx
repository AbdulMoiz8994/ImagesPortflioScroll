import React from 'react';
import { FormattedMessage } from 'react-intl';
import NavLink from 'components/nav-link/nav-link';
import { AUTHORIZED_MENU_ITEMS } from 'site-settings/site-navigation';
import { Text, Box } from '@chakra-ui/react';
import Link from 'next/link';

type Props = {
  onLogout: () => void;
};

export const AuthorizedMenu: React.FC<Props> = ({ onLogout }) => {
  return (
    <>
      {AUTHORIZED_MENU_ITEMS.map((item, idx) => (
        <Box key={item.defaultMessage} mt="2" mb="2">
          <Link href={item.href}>
            <a>
              <Text
              ml={{ base: "0", md: "8"}}
              _hover={{
                color: "primary.100"
              }}
            >
              <FormattedMessage 
                id={item.id}
                defaultMessage={item.defaultMessage}
              />
            </Text>
            </a>
          </Link>
        </Box>
      ))}
      <div className='menu-item' onClick={onLogout}>
        <a>
          <span>
            <FormattedMessage id='nav.authMenu.logout' defaultMessage='Logout' />
          </span>
        </a>
      </div>
    </>
  );
};
