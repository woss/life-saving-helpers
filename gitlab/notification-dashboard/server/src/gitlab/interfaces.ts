/**
 * @author      ReactiioN
 * @copyright   2019, https://reactiion.net
 * @license     MIT
 */
export interface GitlabProject {
  /**
   * Specifies the respository id.
   */
  id: number
  /**
   * Specifies the respository name.
   */
  name: string
  /**
   * Specifies optional the repository description.
   */
  description: string
  /**
   * Specifies the associated repository url.
   */
  web_url: string
  /**
   * Specifies optional the url to an avatar.
   */
  avatar_url: string | null
  /**
   * Specifies the ssh url for git.
   */
  git_ssh_url: string
  /**
   * Specifies the http url for git.
   */
  git_http_url: string
  /**
   * Specifies the repository namespace name (e.g. name of user, name or organisation).
   */
  namespace: string
  /**
   * Specifies whether the repository is 'private', 'internal' or 'public.
   */
  visibility_level: number
  /**
   * Specifies the namespace/name as string.
   */
  path_with_namespace: string
  /**
   * Specifies the default branch (by default: master).
   */
  default_branch: string
  /**
   * Specifies optional the path to the CI configuration.
   */
  ci_config_path: string
  /**
   * Specifies the repository homepage.
   */
  homepage: string
  /**
   * Specifies the repository url.
   */
  url: string
  /**
   * Specifies the repository ssh url.
   */
  ssh_url: string
  /**
   * Specifies the repository http url.
   */
  http_url: string
}

export interface GitlabCommitUser {
  /**
   * Specifies the git username.
   */
  name: string
  /**
   * Specifies the git email.
   */
  email: string
}

export interface GitlabCommit {
  /**
   * Specifies the commit hash.
   */
  id: string
  /**
   * Specifies the commit message.
   */
  message: string
  /**
   * Specifies the commit timestamp.
   */
  timestamp: string
  /**
   * Specifies the absolut web url to this commit.
   */
  url: string
  /**
   * Specifies the author's name and mail.
   */
  author: GitlabCommitUser
  /**
   * Specifies the files added.
   */
  added: string[]
  /**
   * Specifies the files modifies.
   */
  modified: []
  /**
   * Specifies the files removed.
   */
  removed: []
}

export interface GitlabRepository {
  /**
   * Specifies the name of the repository.
   */
  name: string
  /**
   * Specifies the url to the repository.
   */
  url: string
  /**
   * Specifies optional the description of the repository.
   */
  description: string
  /**
   * Specifies the repository homepage.
   */
  homepage: string
  /**
   * Specifies the ssh url for git.
   */
  git_ssh_url: string
  /**
   * Specifies the http url for git.
   */
  git_http_url: string
  /**
   * Specifies whether the repository is 'private', 'internal' or 'public.
   */
  visibility_level: number
}

export interface GitlabPushEvent {
  object_kind: "issue" | "push" | "note"
  event_name: string
  /**
   * Specifies the previous commit hash.
   */
  before: string
  /**
   * Specifies the last commit hash of this push event.
   */
  after: string
  /**
   * Specifies the git origin ref.
   */
  ref: string
  /**
   * Specifies the checkout hash.
   */
  checkout_sha: string
  /**
   * Specifies optional a message.
   */
  message: string | null
  /**
   * User info 
   */
  user: User,
  /**
   * Specifies the project's id.
   */
  project_id: number
  /**
   * Specifies some informations about the project.
   */
  project: GitlabProject
  /**
   * Specifies the commit data.
   */
  commits: GitlabCommit[]
  /**
   * Specifies the total commits pushed.
   */
  total_commits_count: number
  /**
   * Specifies optional some options.
   */
  push_options: object
  /**
   * Specifies some informations about the repository.
   */
  repository: GitlabRepository,
  /**
   * Event object attributes
   */
  object_attributes: ObjectAttributes,
  /**
   * Describing the Issue
   */
  issue?: Issue,
  /**
   * Issue changes
   */
  changes?: Changes
}

export interface ObjectAttributes {
  attachment: null;
  author_id: number;
  change_position: null;
  commit_id: null;
  created_at: string;
  discussion_id: string;
  id: number;
  line_code: null;
  note: string;
  noteable_id: number;
  noteable_type: string;
  original_position: null;
  position: null;
  project_id: number;
  resolved_at: null;
  resolved_by_id: null;
  resolved_by_push: null;
  st_diff: null;
  system: boolean;
  type: null;
  updated_at: string;
  updated_by_id: null;
  description: string;
  url: string;
  state_id?: number,
  title?: string
}

export interface Issue {
  author_id: number;
  closed_at: null;
  confidential: boolean;
  created_at: string;
  description: string;
  discussion_locked: null;
  due_date: null;
  id: number;
  iid: number;
  last_edited_at: null;
  last_edited_by_id: null;
  milestone_id: null;
  moved_to_id: null;
  duplicated_to_id: null;
  project_id: number;
  relative_position: number;
  state_id: number;
  time_estimate: number;
  title: string;
  updated_at: string;
  updated_by_id: number;
  weight: null;
  url: string;
  total_time_spent: number;
  time_change: number;
  human_total_time_spent: null;
  human_time_change: null;
  human_time_estimate: null;
  assignee_ids: number[];
  assignee_id: number;
  labels: any[];
  state: string;
  severity: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
  email: string;
}

export interface Changes {
  closed_at: EdAt;
  state_id: StateID;
  updated_at: EdAt;
}

export interface EdAt {
  previous: null | string;
  current: string;
}

export interface StateID {
  previous: number;
  current: number;
}
