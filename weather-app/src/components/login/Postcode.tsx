import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import styled from "styled-components";

interface PostcodeProps {
  zipCode: string;
  setZipcode: React.Dispatch<React.SetStateAction<string>>;
  roadAddress: string;
  setRoadAddress: React.Dispatch<React.SetStateAction<string>>;
  detailAddress: string;
  setDetailAddress: React.Dispatch<React.SetStateAction<string>>;
}

const Postcode: React.FC<PostcodeProps> = ({
  zipCode,
  setZipcode,
  roadAddress,
  setRoadAddress,
  detailAddress,
  setDetailAddress,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const completeHandler = (data: any) => {
    setZipcode(data.zonecode);
    setRoadAddress(data.roadAddress);
    setIsOpen(false);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      left: "0",
      margin: "auto",
      width: "500px",
      height: "600px",
      padding: "0",
      overflow: "hidden",
    },
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
  };

  const clickHandler = async () => {
    if (detailAddress === "") {
      alert("상세주소를 입력해주세요.");
    } else {
      console.log(zipCode, roadAddress, detailAddress);
      toggle();
    }
  };

  return (
    <Container>
      <label htmlFor="address">주소</label>
      <div className="zip">
        <input className="zipcode" value={zipCode} readOnly placeholder="우편번호" />
        <button className="custom" onClick={toggle} style={{marginLeft:"20px", width:"70%"}}>
          우편번호 검색
        </button>
        <br />
      </div>
      <input value={roadAddress} className="road" readOnly placeholder="도로명 주소" />
      <br />
      <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
        <DaumPostcode onComplete={completeHandler} />
      </Modal>
      <Label>
        <input type="text" className="detail" onChange={changeHandler} value={detailAddress} placeholder="상세주소" />
        <br />
        <button className="custom-two" onClick={clickHandler}>
          주소 등록
        </button>
      </Label>
    </Container>
  );
};

export default Postcode;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  input {
    margin: 3px;
  }

  .zip {
    display: flex;
    flex-direction: row;
    gap: 18px;
    width: 100%;
    @media (max-width:430px){
      display:flex;
      flex-direction: column; 
      line-height: 0;
    }

    
  }
  .zipcode {
    margin: 10px;
    width: 450px;
    margin: 10px;
    @media (max-width:430px){
      width: 70%
    }
  }

  .road {
    margin-left: 10px;
  }
  .detail {
    width: 70%;
    padding: 0;
    margin-bottom: 5px;
  }
  button {
    margin: 10px;
    width:100%;
  }

  @media (max-width:430px){
    display:flex;
    flex-direction: column; 
  }
  `;


const Label = styled.label`
  position: relative;


  input {
    border: none;
    padding: 0;
    height: 40px;
    width: 200px;
    margin-bottom: 5px;
   
  }
  button {
    position: absolute;
    top: 0px;
    right: 20px;


    @media (max-width:430px){
      position: relative;
      display: flex;
      flex-direction: column;
      margin-top: 10px;  
      margin-left: auto; 
      margin-right: auto; 
    }
  }

 
`;