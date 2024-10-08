import React from 'react';
import PropTypes from 'prop-types';
import './Board.css';

const Block = ({ block, index, isFlipped, isClickable, handleClick }) => {
  const blockStyle = {
    width: '50px',
    height: '50px',
    backgroundColor: isFlipped ? block.color : '#e0e0e0',
    border: '1px solid #000',
    cursor: isClickable ? 'pointer' : 'not-allowed',
    transition: 'background-color 0.3s ease',
  };

  return React.createElement(
    'div',
    {
      'data-testid': `block-${index}`,
      key: index,
      onClick: isClickable ? () => handleClick(index) : undefined,
      style: blockStyle,
    }
  );
};

Block.propTypes = {
  block: PropTypes.shape({
    color: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  isClickable: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const GameBoardGrid = ({
  blocks,
  flippedBlocks,
  isGameVisible,
  isGameOver,
  handleBlockClick,
}) => {
  const gridSize = Math.sqrt(blocks.length);

  return React.createElement(
    'div',
    {
      className: 'game-board',
      style: {
        gridTemplateColumns: `repeat(${gridSize}, 50px)`,
        gridTemplateRows: `repeat(${gridSize}, 50px)`,
      },
    },
    blocks.map((block, index) =>
      React.createElement(Block, {
        key: index, 
        block: block,
        index: index,
        isFlipped: isGameVisible || flippedBlocks[index] || isGameOver,
        isClickable: !isGameVisible,
        handleClick: handleBlockClick,
      })
    )
  );
};

GameBoardGrid.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  flippedBlocks: PropTypes.arrayOf(PropTypes.bool).isRequired,
  isGameVisible: PropTypes.bool.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  handleBlockClick: PropTypes.func.isRequired,
};

const GameBoard = ({
  blocks,
  flippedBlocks,
  isGameVisible,
  isGameOver,
  handleBlockClick,
}) => {
  return React.createElement(
    'div',
    { className: 'game-board-container' },
    React.createElement(GameBoardGrid, {
      blocks: blocks,
      flippedBlocks: flippedBlocks,
      isGameVisible: isGameVisible,
      isGameOver: isGameOver,
      handleBlockClick: handleBlockClick,
    })
  );
};

GameBoard.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  flippedBlocks: PropTypes.arrayOf(PropTypes.bool).isRequired,
  isGameVisible: PropTypes.bool.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  handleBlockClick: PropTypes.func.isRequired,
};

export default GameBoard;
