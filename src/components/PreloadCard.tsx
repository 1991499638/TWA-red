import React from 'react';
import styled from 'styled-components';

interface PreloadCardProps {
  url: string;
  onClose: (value: boolean | null) => void;
}

const Card = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const CardHeader = styled.div`
  padding: 10px;
  text-align: right;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 24px;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 200px;
  border: none;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const PreloadCard: React.FC<PreloadCardProps> = ({ url, onClose }) => {
  const handleClose = (value: boolean | null) => {
    onClose(value);
  };

  return (
    <Card>
      <CardHeader>
        <CloseButton onClick={() => handleClose(null)}>&times;</CloseButton>
      </CardHeader>
      <Iframe src={`http://101.32.218.251:3000/fetch-meta?url=${url}`} title="Preload Website"></Iframe>
      <CardFooter>
        <ActionButton onClick={() => handleClose(true)}>Access</ActionButton>
        <ActionButton onClick={() => handleClose(false)}>Refuse</ActionButton>
      </CardFooter>
    </Card>
  );
};

export default PreloadCard;
