import styled from "styled-components";

export const Card = styled.div`
  padding: 18px 20px;
  border-radius: 8px;
  background-color: white;

  @media (prefers-color-scheme: dark) {
    background-color: #111;
  }
`;

export const FlexBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;

  display: flex;
  justify-content: space-between; // 使元素在水平方向上均匀分布
`;

export const FlexBoxCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.disabled ? "#6e6e6e" : "var(--tg-theme-button-color)"};
  border: 0;
  border-radius: 8px;
  padding: 10px 20px;
  color: var(--tg-theme-button-text-color);
  font-weight: 700;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};
`;

export const Ellipsis = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Input = styled("input")`
  padding: 10px 20px;
  border-radius: 10px;
  width: 100%;
  border: 1px solid #c2c2c2;

  text-align: right; // 使输入框右对齐

  @media (prefers-color-scheme: dark) {
    border: 1px solid #fefefe;
  }
`;

export const Select = styled("select")`
  padding: 10px 20px;
  border-radius: 10px;
  width: 100%;
  border: 1px solid #c2c2c2;
  appearance: none; // 移除默认的浏览器样式

  text-align: right; // 使选择框右对齐

  @media (prefers-color-scheme: dark) {
    border: 1px solid #fefefe;
  }
`;

export const Option = styled("option")`
  background-color: #f8f9fa;
  color: #343a40;
  display: flex;
  justify-content: space-between;

  @media (prefers-color-scheme: dark) {
    background-color: #343a40;
    color: #f8f9fa;
  }
`;

export const Label = styled.label`
  line-height: 40px; // 调整这个值以使文字和输入框或选择框对齐

  width: 100px; // 调整这个值以改变标签的长度
  text-align: left; // 使文字左对齐
`;

