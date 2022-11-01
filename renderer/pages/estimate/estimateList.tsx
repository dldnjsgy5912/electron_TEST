/** ************************************************
 * 프로젝트 명 :
 * 설     명 : EstimateList
 * 작  성  자 : HelloBiz
 * 작 성 일 자 : 2022-08-04
 * ------------------------------------------------
 * 2022-08-04 : 초안
 ************************************************* */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import {
  FormControl,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EstimateList = () => {
  // ----------- variables ---------------
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [search2, setSearch2] = useState(0);
  const [lists, setDatas] = useState<any>([]);
  const head = [
    "번호",
    "제품명",
    "공장명",
    "견적요청업체",
    "이름",
    "전화번호",
    "작성일자",
    "견적상태",
  ];

  //페이지 네이션 변수
  const pages = router.query.page;
  const queryPages = Number(pages);
  const [currentPage, setCurrentPage] = useState(queryPages);

  const [TOTAL_CNT, setTOTAL_CNT] = useState(queryPages);
  const count = Math.ceil(TOTAL_CNT / 10);

  //키워드 변수
  const queryKeyword = router.query.keyword;
  const [keyword, setkeyword] = useState(queryKeyword || "");

  //셀렉터 변수
  const [search, setSearch] = useState<string | string[]>(
    router.query.search || "0"
  );

  // ----------- functions ---------------
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //페이지네이션 이벤트
  const onHandlePaginate = (
    e: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setCurrentPage(pageNumber);
    router.push(
      `/estimate/estimateList?page=${pageNumber}&keyword=${keyword}&search=${search}`
    );
  };

  //검색 이벤트
  const searh = () => {
    router.push(
      `/estimate/estimateList?page=1&keyword=${keyword}&search=${search}`
    );
    setCurrentPage(1);
  };

  // 회사 초기 데이터 가져오기
  const getCompany = async () => {
    try {
      const res = await axios.get(
        `https://api.plasticnara.com/api/web/estimate/EstimateList?PTR_ID=131&SEARCH_TYPE1=${search}&KEYWORD=${keyword}&PAGE=${pages}&SEARCH_TYPE2=0`
      );
      console.log(res);
      console.log("res", res.data.data[0].list);
      setDatas(res.data.data[0].list);
      setTOTAL_CNT(res.data.data[0].TOTAL_CNT);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCompany();
  }, [router.asPath]);

  return (
    <div style={{ width: "1400px", margin: "0 auto" }}>
      <h2>견적 관리</h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="견적서 관리" {...a11yProps(0)} />
            <Tab label="견적요청서 관리" {...a11yProps(1)} />
            <Tab label="순도공개 관리" {...a11yProps(2)} />
            <Tab label="내 순도 공개 요청 관리" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className="listTop">
            <div className="leftItem">
              <FormControl className="shot input-30">
                <Select
                  displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={search}
                  onChange={(e: any) => setSearch(e.target.value)}
                >
                  <MenuItem value="0">ALL</MenuItem>
                  <MenuItem value="1">Company</MenuItem>
                  <MenuItem value="2">Name</MenuItem>
                  <MenuItem value="3">Phone</MenuItem>
                  <MenuItem value="4">Email </MenuItem>
                </Select>
              </FormControl>
              <FormControl className="shot input-30">
                <Select
                  displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={search2}
                  onChange={(e: any) => setSearch2(e.target.value)}
                >
                  <MenuItem value="0">ALL</MenuItem>
                  <MenuItem value="1">Company</MenuItem>
                  <MenuItem value="2">Name</MenuItem>
                  <MenuItem value="3">Phone</MenuItem>
                  <MenuItem value="4">Email </MenuItem>
                </Select>
              </FormControl>
              <form noValidate autoComplete="off">
                <TextField
                  className={"wit-210"}
                  id="standard-basic"
                  placeholder="Search by Keyword"
                  value={keyword}
                  inputProps={{ maxLength: 50 }}
                  onChange={(e) => setkeyword(e.currentTarget.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      searh();
                    }
                  }}
                />
              </form>
            </div>
            <div className="rightItem">
              <button
                className={"listBtn"}
                onClick={searh}
                style={{ margin: 0 }}
              >
                조회
              </button>
            </div>
          </div>
          <div className="customerList">
            <div className="listTable">
              {/*<TableContainer component={Paper}>*/}
              <TableContainer
                style={{ borderRadius: "10px", border: "1px solid #C5C5C5" }}
              >
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      {head.map((title, idx) => (
                        <TableCell key={idx} align="center">
                          {title}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {lists?.length ? (
                      lists.map((list) => {
                        return (
                          <TableRow
                            key={list.EMT_ID}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              router.push(`/estimate/${list.EMT_ID}`)
                            }
                          >
                            <TableCell align="center" className="cellNum">
                              {list.EMT_NUM}
                            </TableCell>
                            <TableCell align="left" className="cellTitle">
                              {list.PRD_NM}
                            </TableCell>
                            <TableCell align="center" className="cellDate">
                              {list.REQ_PTR_COM_NM}
                            </TableCell>
                            <TableCell align="center" className="cellDate">
                              {list.PRD_NM}
                            </TableCell>
                            <TableCell align="center" className="cellDate">
                              {list.EMT_REQ_DEPT_NM}
                            </TableCell>
                            <TableCell align="center" className="cellDate">
                              {list.EMT_REQ_DEPT_TEL}
                            </TableCell>
                            <TableCell align="center" className="cellDate">
                              {list.EMT_REG_DT}
                            </TableCell>
                            <TableCell align="left" className="cellNum">
                              {list.EMT_STATE_NM}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          align="center"
                          style={{ backgroundColor: "white" }}
                        >
                          <img
                            className="blankImg"
                            src="/images/blank_gif.gif"
                            alt="no data"
                          />
                          <h3>There are no registered customers.</h3>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                count={count}
                page={currentPage}
                onChange={onHandlePaginate}
                shape="rounded"
                color="primary"
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Three
        </TabPanel>
      </Box>
    </div>
  );
};

export default EstimateList;
