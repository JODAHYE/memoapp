import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  setColor,
  getMemoList,
  getCategoryFilterList,
  setSkip,
} from "../modules/post";
import MemoCard from "./MemoCard";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import "../font.css";
import { customColor } from "../style/theme";
const MemoList = () => {
  const dispatch = useDispatch();
  const { memos } = useSelector((state) => state.post);
  const { category } = useSelector((state) => state.category);
  const { color, skip } = useSelector((state) => state.post);

  useEffect(() => {
    if (!category) {
      dispatch(getMemoList(skip, color));
    } else {
      dispatch(getCategoryFilterList(skip, category, color));
    }
  }, [skip, color, category]);

  const onColorClick = useCallback((e) => {
    dispatch(setSkip(0));
    dispatch(setColor(e.target.getAttribute("color")));
  }, []);

  const onNext = useCallback(() => {
    dispatch(setSkip(skip + 6));
  }, [skip]);

  const onPrev = useCallback(() => {
    if (skip <= 0) return;
    dispatch(setSkip(skip - 6));
  }, [skip]);

  return (
    <Wrap>
      <FilterBox>
        <Color color={customColor.red} onClick={onColorClick} />
        <Color color={customColor.yellow} onClick={onColorClick} />
        <Color color={customColor.purple} onClick={onColorClick} />
      </FilterBox>
      <div>
        {memos &&
          memos.length > 0 &&
          memos.map((v, i) => <MemoCard key={i} memo={v} />)}
      </div>
      <Controll>
        <PrevBtn onClick={onPrev} />
        <NextBtn onClick={onNext} />
      </Controll>
    </Wrap>
  );
};

export default memo(MemoList);
const Wrap = styled.div`
  width: 60%;
  margin: 0 auto;
  text-align: center;
  position: relative;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 320px;
  }
`;
const FilterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Color = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${(props) => props.color};
  font-weight: 600;
  font-size: 22px;
  margin: 2px;
  border: 1px solid transparent;
  cursor: pointer;
  transform: scale(1);
  &:hover {
    border: ${(props) => (props.border ? "none" : "1px solid #fff")};
    transform: scale(1.5);
  }
  @media (min-width: 320px) and (max-width: 480px) {
    width: 18px;
    font-size: 18px;
    height: 18px;
  }
`;
const Controll = styled.div`
  display: flex;
  justify-content: center;
`;
const NextBtn = styled(HiChevronRight)`
  cursor: pointer;
  margin-top: 40px;
  padding: 8px;
  border-left: 1px solid #fff;
  background: ${customColor.buttonActive};
  &:active {
    background: ${customColor.button};
  }
`;
const PrevBtn = styled(HiChevronLeft)`
  cursor: pointer;
  margin-top: 40px;
  padding: 8px;
  background: ${customColor.buttonActive};
  &:active {
    background: ${customColor.button};
  }
`;
