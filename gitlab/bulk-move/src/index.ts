/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as dotenv from "dotenv";
import fetch from "cross-fetch";
import qs from "qs";
import { Issue } from "./interfaces";
import FormData from "form-data";

dotenv.config();

const project1ID = process.env.GITLAB_MOVE_PROJECT_FROM_ID;
const project2ID = process.env.GITLAB_MOVE_PROJECT_TO_ID;

const gitlabApiURL = "https://gitlab.com/api/v4";

const gitlabAPI = {
  issues: {
    listProjectIssues: (projectID: number, extra = {}) =>
      `${gitlabApiURL}/projects/${projectID}/issues/?${qs.stringify(extra)}`,
    moveIssue: (projectId: number, issueIid: number) =>
      `${gitlabApiURL}/projects/${projectId}/issues/${issueIid}/move`,
  },
};

const gitlabAuthHeader = {
  "PRIVATE-TOKEN": process.env.GITLAB_ACCESS_TOKEN,
};

async function fetch_get(url) {
  console.log("fetching the url:", url);

  const headers = {
    ...gitlabAuthHeader,
  };

  return await fetch(url, { headers });
}
async function fetch_post(url, data) {
  console.log("posting the url:", url);

  const headers = {
    ...gitlabAuthHeader,
  };

  return await fetch(url, { method: "POST", headers, body: data });
}

async function listProjectIssues(projectID: number) {
  return await fetch_get(
    gitlabAPI.issues.listProjectIssues(project1ID, {
      state: "opened",
      per_page: 100,
    })
  );
}

async function moveIssuesToProject(from: number, to: number, issues: Issue[]) {
  console.log(issues.length);

  await Promise.all(
    issues.map(async (issue) => {
      const body = new FormData();
      body.append("to_project_id", project2ID as unknown as string);
      console.log(body);
      // return
      console.log("moving the %s with IID %s", issue.title, issue.iid);
      const response = await fetch_post(
        gitlabAPI.issues.moveIssue(project1ID, issue.iid),
        body
      );
      const movedIssue = await response.json();
      console.log(movedIssue);
    })
  );
}

async function main() {
  const response = await listProjectIssues(project1ID);
  const issues = (await response.json()) as Issue[];
  await moveIssuesToProject(project1ID, project2ID, issues);
}
main().catch(console.error);
