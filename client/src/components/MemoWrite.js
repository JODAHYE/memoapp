import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryList, setCategory } from "../modules/category";
import { usePost } from "../hooks/usePost";
import { customColor } from "../style/theme";
import { setColor, setSkip } from "../modules/post";

const MemoWrite = () => {
  const dispatch = useDispatch();
  const { writeMemo } = usePost();
  const { categories } = useSelector((state) => state.category);
  const [value, setValue] = useState({
    title: "",
    content: "",
    color: "#8C8C8C",
    category: "",
  });

  useEffect(() => {
    dispatch(getCategoryList());
  }, []);

  const onChange = useCallback(
    (e) => {
      setValue({ ...value, [e.target.name]: e.target.value });
    },
    [value]
  );

  const onColorClick = useCallback(
    (e) => {
      setValue({ ...value, color: e.target.getAttribute("color") });
    },
    [value]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!value.title || !value.content) {
        return alert("Please enter a value");
      }
      writeMemo(value);
      dispatch(setColor(""));
      dispatch(setSkip(0));
      dispatch(setCategory(""));
    },
    [value, writeMemo]
  );

  return (
    <Wrap>
      <Option color={value.color}>
        <MemoColor color={customColor.red} onClick={onColorClick} />
        <MemoColor color={customColor.yellow} onClick={onColorClick} />
        <MemoColor color={customColor.purple} onClick={onColorClick} />
        <MemoColorBasicBtn
          onClick={() => {
            setValue({ ...value, color: "#8C8C8C" });
          }}
        >
          <Icon src="../../img/cancel-circle.svg" />
        </MemoColorBasicBtn>
        <SelectBox
          onChange={(e) => {
            setValue({ ...value, category: e.target.value });
          }}
        >
          <CategorySelector value="">default</CategorySelector>
          {categories.map((v, i) => (
            <CategorySelector key={i} value={v.name}>
              {v.name}
            </CategorySelector>
          ))}
        </SelectBox>
      </Option>
      <Form onSubmit={onSubmit}>
        <Title
          type="text"
          placeholder="Title"
          name="title"
          value={value.title}
          onChange={onChange}
        />
        <Content
          placeholder="Content"
          name="content"
          value={value.content}
          onChange={onChange}
        />
        <SubmitBtn>Complete</SubmitBtn>
      </Form>
    </Wrap>
  );
};

export default MemoWrite;

const Wrap = styled.div`
  width: 600px;
  height: 600px;
  box-shadow: 2px 2px 2px 2px #b4b4b5;
  background: #eee;
  overflow: hidden;
  margin: 0 auto;
  @media (min-width: 320px) and (max-width: 374px) {
    width: 100%;
    height: 60vh;
  }
  @media (min-width: 375px) and (max-width: 480px) {
    width: 88%;
    height: 60vh;
  }
`;
const Option = styled.div`
  width: 100%;
  height: 10%;
  background: ${(props) => props.color};
  display: flex;
  align-items: center;
  position: relative;
`;
const MemoColor = styled.span`
  margin: 0 10px;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${(props) => props.color};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0 2px;
  }
`;
const MemoColorBasicBtn = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  outline: none;
`;
const Icon = styled.img`
  width: 20px;
`;
const SelectBox = styled.select`
  outline: none;
  padding: 5px;
  font-size: 16px;
  position: absolute;
  right: 10px;
  width: 50%;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 14px;
  }
`;
const CategorySelector = styled.option`
  font-size: 14px;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`;
const Form = styled.form`
  width: 100%;
  height: 80%;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 320px) and (max-width: 480px) {
    height: 84%;
  }
`;
const Title = styled.input`
  border: none;
  outline: none;
  width: 70%;
  padding: 10px;
  font-size: 16px;
  @media (min-width: 320px) and (max-width: 374px) {
    width: 85%;
    font-size: 14px;
  }
  @media (min-width: 375px) and (max-width: 480px) {
    width: 85%;
  }
`;
const Content = styled.textarea`
  border: none;
  outline: none;
  width: 70%;
  height: 70%;
  padding: 10px;
  border-top: 1px solid #2f4858;
  @media (min-width: 320px) and (max-width: 374px) {
    width: 85%;
    height: 80%;
    font-size: 14px;
  }
  @media (min-width: 375px) and (max-width: 480px) {
    width: 85%;
    height: 80%;
  }
`;
const SubmitBtn = styled.button`
  outline: none;
  margin-top: 20px;
  border: none;
  padding: 10px;
  cursor: pointer;
  background: ${customColor.button};
  &:active {
    background: ${customColor.buttonActive};
  }
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 6px;
    margin-top: 10px;
  }
`;
