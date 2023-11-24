import React,{useState} from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal"; // 추가
import styled from "styled-components";
import axios from "axios";


const Postcode: React.FC = ({zipCode,setZipcode,roadAddress,setRoadAddress,detailAddress,setDetailAddress}:any) =>{

    const [isOpen, setIsOpen] = useState<boolean>(false); //추가

    const completeHandler = (data:any) =>{
        setZipcode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setIsOpen(false); //추가
    }

    // Modal 스타일
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

    // 검색 클릭
    const toggle = () =>{
        setIsOpen(!isOpen);
    }

    // 상세 주소검색 event
    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setDetailAddress(e.target.value);
    }

    // 추가
    const clickHandler = async () => {
        if (detailAddress === "") {
          alert("상세주소를 입력해주세요.");
        } else {
          console.log(zipCode,roadAddress,detailAddress )
       
      toggle();
        }  
      };

    return(
        <div>
            <Container>
                <label htmlFor="address">주소</label> 
                <div className="zip" >
                    <input value={zipCode} className="zipcode" readOnly placeholder="우편번호" />
                    <button className="custom" onClick={toggle}>우편번호 검색</button>
                <br />
                </div>
            </Container>
            <Container>
                <input value={roadAddress} readOnly placeholder="도로명 주소" />
                <br />
            </Container>
            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                <DaumPostcode onComplete={completeHandler}/>
            </Modal>
            <Label>
            <input type="text"  onChange={changeHandler} value={detailAddress} placeholder="상세주소"/>
            <br />
            <button className="custom-two" onClick={clickHandler}>주소 등록</button>
            </Label>
            
            
        </div>
    );
}

export default Postcode;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  input {
   margin:10px;
  }

  .zip {
    display: flex;
    flex-direction: row;
    gap: 18px;
  }
  .zipcode {
    width: 250px;
    margin: 10px;
  }

button {
    margin:  10px;
}
`

const Label = styled.label`
  position: relative;

  input {
    border: none;
    padding: 0 15px;
    height: 40px;
    width: 406px;
  }
  button {
    position: absolute;
    top: 0;
    right: 5px;
  }
`;