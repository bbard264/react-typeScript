import { useTranslation } from 'react-i18next';
import { Space, Divider, Row, Col, Button, Card, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
  moveLeft, // Import the action creator
  changePattern, // Import the action creator
  moveRight, // Import the action creator
  random, // Import the action creator
} from '../redux/layoutStyleSlice'; // Update the path to your slice file
import './LayoutStyle.scss';

export default function LayoutStyle() {
  const myStyle = {
    rowWidth: '75vw',
    paddingCol: '0 0.5rem',
    buttonStyle: {
      width: '100%',
      height: '6rem',
      padding: '0.5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    colSpan: 6,
  };
  const { pattern, shapeOrder } = useSelector(
    (state: RootState) => state.layoutStyle
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleMoveLeft = () => {
    dispatch(moveLeft());
  };

  const handleChangePattern = () => {
    dispatch(changePattern());
  };

  const handleMoveRight = () => {
    dispatch(moveRight());
  };

  const handleRandom = () => {
    dispatch(random());
  };

  return (
    <Space
      direction="vertical"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1rem',
      }}
    >
      <Row style={{ width: myStyle.rowWidth }} justify="center">
        <Col span={myStyle.colSpan} style={{ padding: myStyle.paddingCol }}>
          <Tooltip placement="bottom" title={t(`moveShape`)}>
            <Button style={myStyle.buttonStyle} onClick={handleMoveLeft}>
              <div className="triangle left" />
            </Button>
          </Tooltip>
        </Col>
        <Col span={myStyle.colSpan * 2} style={{ padding: myStyle.paddingCol }}>
          <Tooltip placement="bottom" title={t(`movePosition`)}>
            <Button style={myStyle.buttonStyle} onClick={handleChangePattern}>
              <div className="triangle up" />
              <div className="triangle down" />
            </Button>
          </Tooltip>
        </Col>
        <Col span={myStyle.colSpan} style={{ padding: myStyle.paddingCol }}>
          <Tooltip placement="bottom" title={t(`moveShape`)}>
            <Button style={myStyle.buttonStyle} onClick={handleMoveRight}>
              <div className="triangle right" />
            </Button>
          </Tooltip>
        </Col>
      </Row>
      <Divider />
      <Row style={{ width: myStyle.rowWidth }} justify="center">
        {pattern === '43' ? (
          <Col
            key={'blank'}
            span={myStyle.colSpan}
            style={{ padding: myStyle.paddingCol }}
          >
            <Card style={{ display: 'none' }}></Card>
          </Col>
        ) : (
          <></>
        )}
        {shapeOrder.slice(0, 3).map((card: string, index: number) => (
          <Col
            key={card + index}
            span={myStyle.colSpan}
            style={{ padding: myStyle.paddingCol }}
          >
            <Tooltip placement="top" title={t(`Random`)}>
              <Button style={myStyle.buttonStyle} onClick={handleRandom}>
                <div className={card} />
              </Button>
            </Tooltip>
          </Col>
        ))}
      </Row>
      <Row style={{ width: myStyle.rowWidth }} justify="center">
        {pattern === '34' ? (
          <Col
            key={'blank'}
            span={myStyle.colSpan}
            style={{ padding: myStyle.paddingCol }}
          >
            <Card style={{ display: 'none' }}></Card>
          </Col>
        ) : (
          <></>
        )}
        {shapeOrder.slice(3).map((card: string, index: number) => (
          <Col
            key={card + index}
            span={myStyle.colSpan}
            style={{ padding: myStyle.paddingCol }}
          >
            <Tooltip placement="bottom" title={t(`Random`)}>
              <Button style={myStyle.buttonStyle} onClick={handleRandom}>
                <div className={card} />
              </Button>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </Space>
  );
}
