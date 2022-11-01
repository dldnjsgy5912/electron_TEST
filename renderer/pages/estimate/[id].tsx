/** ************************************************
 * 프로젝트 명 :
 * 설     명 : EstimateDetail
 * 작  성  자 : HelloBiz
 * 작 성 일 자 : 2022-08-04
 * ------------------------------------------------
 * 2022-08-04 : 초안
 ************************************************* */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { TextField } from "@mui/material";

const EstimateDetail = () => {
  // ----------- variables ---------------
  const router = useRouter();
  const [data, setDatas] = useState<any>([]);
  console.log(data);
  console.log(router.query);

  // ----------- functions ---------------
  //초기 데이터 가져오기
  const getCompany = async () => {
    try {
      const res = await axios.get(
        `https://api.plasticnara.com/api/web/estimate/EstimateInfo?EMT_ID=${router.query.id}`
      );
      console.log("res", res.data.data[0]);
      setDatas(res.data.data[0]);
    } catch (e) {}
  };
  useEffect(() => {
    if (router.query.id) {
      getCompany();
    }
  }, []);

  return (
    <div style={{ width: "1400px", margin: "0 auto" }}>
      <h2>견적서 관리</h2>
      <div
        className={"bor"}
        style={{
          border: "1px solid #ccccccc !important",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <div className="oneLine ht-50">
          <TextField
            className={"input-30"}
            id="standard-basic"
            label="공장명"
            value={data?.PAT_NM}
            style={{ marginRight: "30px" }}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          <TextField
            id="standard-basic"
            className={"input-40"}
            label="의뢰제품"
            value={data?.PRD_NM}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
        </div>
        <div className="oneLine ht-50">
          <TextField
            id="standard-basic"
            className={"input-30"}
            label="견적요청업체"
            value={data?.REQ_PTR_COM_NM}
            style={{ marginRight: "30px" }}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          <TextField
            id="standard-basic"
            className={"input-30"}
            label="담당자"
            value={data?.EMT_REQ_DEPT_NM}
            disabled
            style={{ marginRight: "30px" }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          <TextField
            id="standard-basic"
            label="연락처"
            value={data?.EMT_REQ_DEPT_TEL}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
        </div>
        <div className="oneLine ht-50">
          <TextField
            id="standard-basic"
            className={"input-30"}
            label="견적요청 내용"
            value={data?.EMT_INFO}
            style={{ marginRight: "30px" }}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
        </div>
        <div className="oneLine ht-50">
          <TextField
            id="standard-basic"
            className={"input-30"}
            label="담당자"
            value={data?.EMT_DEPT_NM}
            style={{ marginRight: "30px" }}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          <TextField
            id="standard-basic"
            className={"input-30"}
            label="연락처"
            value={data?.EMT_DEPT_TEL}
            disabled
            style={{ marginRight: "30px" }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          <TextField
            id="standard-basic"
            label="제안가격"
            value={data?.EMT_PRICE}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
        </div>
        <div className="oneLine ht-50" style={{ borderBottom: 0 }}>
          <TextField
            id="standard-basic"
            className={"input-30"}
            label="견적서 내용"
            value={data?.EMT_CONTENT}
            style={{ marginRight: "30px" }}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
        </div>
      </div>
      <button className={"listBtn"} onClick={() => router.back()}>
        목록
      </button>
    </div>
  );
};

export default EstimateDetail;
