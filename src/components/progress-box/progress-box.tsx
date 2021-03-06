import React, { Fragment } from 'react';
import {
  ProgressBarWrapper,
  ProgressStep,
  ProgressBar,
  StatusTitle,
  StatusBox,
  StatusDetails,
  CheckMarkWrapper,
} from './progress-box.style';
import { CheckMark } from 'assets/icons/CheckMark';
import { getOrderStatusLabel } from 'utils/getOrderStatusLabel';
import { Tooltip  } from '@chakra-ui/react'

type ProgressProps = {
  data?: any;
  status?: any;
};

const ProgressBox: React.FC<ProgressProps> = ({ status, data }) => {
  return (
    <>
      {data.map((item, index) => {
        return (
          <Fragment key={item}>
            {getOrderStatusLabel(item).description ? <Tooltip label={getOrderStatusLabel(item).description} placement="top" hasArrow gutter={20}>
            <ProgressStep>
              <ProgressBarWrapper className={status >= index + 1 ? 'checked' : ''}>
                <StatusBox>
                  {status >= index + 1 ? (
                    <CheckMarkWrapper>
                      <CheckMark />
                    </CheckMarkWrapper>
                  ) : (
                    index + 1
                  )}
                </StatusBox>
                <ProgressBar />
              </ProgressBarWrapper>
              <StatusDetails>
                {item ? <StatusTitle>{getOrderStatusLabel(item).label || item.charAt(0).toUpperCase() + item.slice(1)}</StatusTitle> : ''}
              </StatusDetails>
            </ProgressStep>
            </Tooltip> : <ProgressStep>
              <ProgressBarWrapper className={status >= index + 1 ? 'checked' : ''}>
                <StatusBox>
                  {status >= index + 1 ? (
                    <CheckMarkWrapper>
                      <CheckMark />
                    </CheckMarkWrapper>
                  ) : (
                    index + 1
                  )}
                </StatusBox>
                <ProgressBar />
              </ProgressBarWrapper>
              <StatusDetails>
                {item ? <StatusTitle>{getOrderStatusLabel(item).label || item.charAt(0).toUpperCase() + item.slice(1)}</StatusTitle> : ''}
              </StatusDetails>
            </ProgressStep>}
          </Fragment>
        )
      })}
    </>
  );
};


export default ProgressBox;
