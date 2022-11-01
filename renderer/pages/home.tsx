import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      paddingTop: theme.spacing(4),
    },
  })
);

function Home() {
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(true);
  const router = useRouter();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [lists, setDatas] = useState<any>([]);
  console.log(process.env);
  console.log("faqlist", lists);

  // ----------- functions ---------------
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  //회사 초기 데이터 가져오기
  const getCompany = async () => {
    try {
      const res = await axios.get(
        `http://18.220.202.163:8888/api/web/faq/FaqList?PAGE=${1}`
      );
      console.log("res", res.data.data[0].list);
      setDatas(res.data.data[0].list);
    } catch (e) {}
  };
  useEffect(() => {
    getCompany();
  }, []);

  return (
    <>
      <Head>
        <title>Home - Nextron (with-typescript-material-ui)</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="container">
        <div className="wrap" style={{ width: "1400px", margin: "0 auto" }}>
          <div className="titleArea">
            <div className={"imgs"}>
              {/*<Image*/}
              {/*    width={246}*/}
              {/*    height={246}*/}
              {/*    src="/images/INFORM.png"*/}
              {/*    alt=""*/}
              {/*    // layout="fill"*/}
              {/*    objectFit="cover"*/}
              {/*/>*/}
            </div>
            {/*<h1>메인</h1>*/}

            {/*<p>{t("Context")}</p>*/}
          </div>
          {/*리스트 영역*/}

          {/*<div*/}
          {/*  className="faqList"*/}
          {/*  style={{ marginTop: "60px", borderRadius: "15px" }}*/}
          {/*>*/}
          {/*  {lists?.length ? (*/}
          {/*    lists.map((list) => {*/}
          {/*      return (*/}
          {/*        <Accordion*/}
          {/*          key={list.FAQ_ID}*/}
          {/*          expanded={expanded === `panel${list.FAQ_ID}`}*/}
          {/*          onChange={handleChange(`panel${list.FAQ_ID}`)}*/}
          {/*        >*/}
          {/*          <AccordionSummary*/}
          {/*            // expandIcon={<ExpandMoreIcon />}*/}
          {/*            aria-controls={`panel${list.FAQ_ID}bh-content`}*/}
          {/*            id={`panel${list.FAQ_ID}bh-header`}*/}
          {/*          >*/}
          {/*            <Typography*/}
          {/*            // sx={{ width: "33%", flexShrink: 0, fontWeight: 700 }}*/}
          {/*            >*/}
          {/*              <span style={{ fontWeight: 700 }}>*/}
          {/*                {list.FAQ_CATEGORY}*/}
          {/*              </span>*/}
          {/*            </Typography>*/}

          {/*            <Typography*/}
          {/*            // sx={{ color: "text.secondary" }}*/}
          {/*            >*/}
          {/*              {list.FAQ_TITLE}*/}
          {/*            </Typography>*/}
          {/*          </AccordionSummary>*/}
          {/*          <AccordionDetails*/}
          {/*          // sx={{ backgroundColor: "#F4F4F4" }}*/}
          {/*          >*/}
          {/*            <Typography style={{ textAlign: "start" }}>*/}
          {/*              <span style={{ fontWeight: 700 }}>*/}
          {/*                {list.FAQ_CONTENT}*/}
          {/*              </span>*/}
          {/*            </Typography>{" "}*/}
          {/*          </AccordionDetails>*/}
          {/*        </Accordion>*/}
          {/*      );*/}
          {/*    })*/}
          {/*  ) : (*/}
          {/*    <Accordion className={"blankWrap"}>*/}
          {/*      <h3>*/}
          {/*        <img*/}
          {/*          className="blankImg"*/}
          {/*          src="/images/blank_gif.gif"*/}
          {/*          alt="no data"*/}
          {/*        />*/}
          {/*        /!*<span>{t("blank")}</span>*!/*/}
          {/*      </h3>*/}
          {/*    </Accordion>*/}
          {/*  )}*/}
          {/*</div>*/}
          {/*<Pagination*/}
          {/*    count={count}*/}
          {/*    page={currentPage}*/}
          {/*    onChange={onHandlePaginate}*/}
          {/*    shape="rounded"*/}
          {/*    color="primary"*/}
          {/*/>*/}
        </div>
      </div>
    </>
  );
}

export default Home;
