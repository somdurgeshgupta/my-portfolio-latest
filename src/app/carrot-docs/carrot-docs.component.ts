import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface DocSection {
  id: string;
  title: string;
  intro: string;
  points: { title: string; text: string }[];
  files: string[];
}

@Component({
  selector: 'app-carrot-docs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carrot-docs.component.html',
  styleUrl: './carrot-docs.component.scss'
})
export class CarrotDocsComponent {
  readonly stack = ['Angular', 'NestJS', 'TypeScript', 'Ollama', 'PostgreSQL + pgvector', 'Redis', 'BullMQ', 'VS Code API'];
  readonly structure = `carrot-ai/
├── frontend/src/app/
│   ├── core/          # API services, JWT interceptor, route guards
│   ├── features/      # Authentication, home and chat screens
│   └── shared/        # Shared Angular module
├── backend/src/
│   ├── auth/          # Registration, login, JWT validation
│   ├── models/        # Discovery and provider selection
│   ├── chat/          # Context assembly and streaming
│   ├── sessions/      # User-owned conversations and memory
│   ├── rag/           # Retrieval, ingestion and job processing
│   ├── agent/         # Model turns and web tools
│   ├── cache/         # Redis cache and connection status
│   ├── entities/      # TypeORM data models
│   └── database/      # Data source and explicit migrations
├── vscode-extension/src/
│   ├── extension.ts       # Commands and chat participant
│   ├── sidebarProvider.ts # Sidebar lifecycle and messages
│   ├── carrotClient.ts    # Authenticated backend client
│   ├── agentLoop.ts       # Model → tool → result loop
│   ├── toolRegistry.ts    # Tool schemas and validation
│   └── workspacePolicy.ts # Workspace access boundaries
└── compose.yaml       # PostgreSQL and Redis services`;

  readonly sections: DocSection[] = [
    {
      id: 'architecture', title: 'Architecture & responsibilities',
      intro: 'I built Carrot AI around a shared backend so the web app and VS Code extension can use the same authentication, model routing, conversation history, and document knowledge.',
      points: [
        { title: 'Angular web application', text: 'The browser provides sign-up and sign-in screens, a streaming chat interface, model selection, conversation management, and document knowledge controls. Core services wrap API calls; guards and the JWT interceptor handle the authenticated client flow.' },
        { title: 'NestJS application layer', text: 'Feature modules separate authentication, sessions, chat, models, RAG, agents, caching, and health checks. Controllers accept requests, services implement behavior, and TypeORM repositories persist application data.' },
        { title: 'VS Code extension host', text: 'The extension owns editor integration and workspace tools. It calls the same backend for model responses, but workspace file access and tool execution stay inside VS Code.' }
      ],
      files: ['backend/src/app.module.ts', 'frontend/src/app/core/', 'vscode-extension/src/extension.ts']
    },
    {
      id: 'structure', title: 'Project structure',
      intro: 'The repository separates the frontend, backend, and extension into their own packages. Within the backend, each feature keeps its controller, service, and module together; shared database entities and migrations have dedicated directories.',
      points: [
        { title: 'Why this structure', text: 'The UI can evolve without moving model logic into components, and the extension can reuse backend capabilities without duplicating the conversation database. Workspace policy remains a separate concern from model inference.' }
      ],
      files: ['frontend/src/app/', 'backend/src/', 'vscode-extension/src/']
    },
    {
      id: 'authentication', title: 'Authentication & user ownership',
      intro: 'A Carrot account connects the browser and extension to the same user identity. Protected backend requests derive that identity from a validated JWT.',
      points: [
        { title: 'Registration and login', text: 'Registration normalizes the email address, checks for an existing account, and stores a bcrypt password hash. Login compares the supplied password with that hash and returns a signed access token plus the user profile.' },
        { title: 'Different clients, one identity', text: 'The Angular app stores its access token in localStorage and attaches it through a JWT interceptor. The extension signs in through the backend and stores its token in VS Code Secret Storage. The sidebar webview does not receive that token.' },
        { title: 'Ownership enforced in the backend', text: 'Session reads, writes, and deletions check the authenticated user. Document listing, retrieval, and ingestion-job access also use that user ID. Frontend route guards help navigation, while backend checks enforce access to the data.' },
        { title: 'Private uploads and public sources', text: 'Uploaded document sources are private. Website knowledge has a separate public-source model with user-to-source associations, allowing public content reuse while keeping private uploads and conversation memory tied to their owner.' }
      ],
      files: ['backend/src/auth/auth.service.ts', 'backend/src/auth/jwt.strategy.ts', 'backend/src/sessions/sessions.service.ts', 'frontend/src/app/core/services/auth.service.ts', 'vscode-extension/src/extension.ts']
    },
    {
      id: 'models', title: 'Local LLMs & model routing',
      intro: 'Carrot connects to existing language models. Ollama runs local inference, while the backend discovers available models and routes each request to the selected provider.',
      points: [
        { title: 'Discovery and selection', text: 'ModelsService discovers the local model inventory and distinguishes chat models from embedding models. Provider-prefixed IDs identify local, Groq, and Gemini models, while Auto resolves a suitable available model.' },
        { title: 'Local-first defaults', text: 'The current preferred local model is reecdev/qwen3.5-lowvram:9b. When cloud routing is permitted, the preferred cloud fallback is Groq’s openai/gpt-oss-120b. Availability and the user’s explicit selection still affect routing.' },
        { title: 'Local Only', text: 'Local Only blocks cloud model requests, and the extension forwards the setting on model turns. Web Search is an independent option: enabling internet retrieval can fetch external context even when inference remains local.' },
        { title: 'Provider-specific streaming', text: 'The chat service supports provider-specific request and streaming formats, including native Ollama and Gemini paths. It prepares context before dispatch so the selected provider receives the conversation and retrieved knowledge.' }
      ],
      files: ['backend/src/models/models.service.ts', 'backend/src/chat/chat.service.ts', 'vscode-extension/src/modelPolicy.ts']
    },
    {
      id: 'rag', title: 'RAG: from documents to answers',
      intro: 'Retrieval-augmented generation gives the model relevant reference material at question time. In Carrot, ingestion prepares the knowledge; retrieval selects context for the current question.',
      points: [
        { title: '01 — Ingest a source', text: 'Authenticated users can submit files, website URLs, or sitemaps. Ingestion jobs track progress and support cancellation. The backend extracts text, splits it into chunks, and records source metadata and access associations.' },
        { title: '02 — Create and store embeddings', text: 'The RAG service requests embeddings from Ollama using nomic-embed-text and stores document chunks in PostgreSQL with pgvector support. A deterministic local vectorizer provides a fallback when the embedding service is unavailable; its retrieval quality differs from model embeddings.' },
        { title: '03 — Retrieve within the user’s access', text: 'For a question, the backend retrieves eligible chunks using vector similarity and the user’s source access. For selected short-document questions, bounded complete-document retrieval avoids dropping details that a small top-k result could miss.' },
        { title: '04 — Assemble a grounded prompt', text: 'Retrieved text becomes reference context alongside the question and conversation. RAG controls include Auto and Always On. Document text is treated as source material, and prompts direct the assistant to avoid inventing missing facts.' }
      ],
      files: ['backend/src/rag/rag.controller.ts', 'backend/src/rag/rag.service.ts', 'backend/src/rag/ingestion-queue.service.ts', 'backend/src/entities/document-chunk.entity.ts']
    },
    {
      id: 'conversations', title: 'Streaming chat & conversation memory',
      intro: 'Conversation state lives in the backend so the web app and extension can work with the signed-in user’s saved sessions.',
      points: [
        { title: 'The message lifecycle', text: 'A request identifies the session and model, checks session ownership, prepares context, and streams response events to the client. Messages retain roles, content, model information, and timestamps in PostgreSQL.' },
        { title: 'Memory across conversations', text: 'SessionsService retrieves bounded prior-session context for the authenticated user and excludes the active conversation. This gives the assistant continuity without placing every past message into every request.' },
        { title: 'Context beyond chat text', text: 'Depending on the request and enabled features, prompt assembly can include the user profile, prior conversation context, retrieved documents, attached content, workspace context, and web results.' },
        { title: 'Session lifecycle', text: 'Users can create, rename, delete, and clear conversations. The extension reloads persisted data after completion, keeping its sidebar a view of backend state rather than a separate history database.' }
      ],
      files: ['backend/src/chat/chat.controller.ts', 'backend/src/chat/chat.service.ts', 'backend/src/sessions/sessions.service.ts', 'vscode-extension/src/carrotClient.ts']
    },
    {
      id: 'vscode', title: 'Using Carrot inside VS Code',
      intro: 'The extension adds a dedicated Activity Bar sidebar and an @carrot chat participant. A webview renders the conversation; the extension host manages authentication, backend requests, and editor access.',
      points: [
        { title: 'Connect the extension', text: 'Start the backend and its required services, then run Carrot AI: Sign In in VS Code using your Carrot account. Configure carrot.backendUrl for your backend, select an available model, and open the Carrot sidebar.' },
        { title: 'Ask mode', text: 'Ask is the conversation mode for questions and explanations. Context controls can attach the current file, a selection, or another workspace file. The extension keeps file content in host memory and sends the webview only the display labels.' },
        { title: 'Agent mode', text: 'Agent handles tasks that need workspace tools. It can discover the project, search and read files, inspect diagnostics and Git state, propose edits, and run approved validation commands. The composer provides a Stop action during a task.' },
        { title: 'Framework and documentation context', text: 'The extension can inspect project manifests to identify frameworks and documentation targets. Cached documentation excerpts help support project-specific work, alongside editor context and the backend’s document retrieval.' }
      ],
      files: ['vscode-extension/src/sidebarProvider.ts', 'vscode-extension/src/sidebarProtocol.ts', 'vscode-extension/src/carrotClient.ts', 'vscode-extension/src/documentationResources.ts']
    },
    {
      id: 'agent', title: 'Agent loop & workspace safeguards',
      intro: 'Model output becomes an action only after the extension validates a structured tool request. The extension remains the authority for workspace access.',
      points: [
        { title: 'Model → tool → evidence → next turn', text: 'AgentLoop requests a model turn, parses the proposed tool call, validates it through ToolRegistry, executes the permitted operation, and returns a bounded result for the next turn. Tool-like prose is not executed as a command.' },
        { title: 'Workspace boundaries', text: 'Reads are limited to explicitly opened workspace roots. Policies block sensitive files and traversal or symlink escapes, and cap file sizes, search results, context, iterations, and task duration.' },
        { title: 'Review before mutation', text: 'Writes and commands go through approval controls. File changes receive a diff preview, and command execution uses allowlisted, bounded operations. The backend receives tool results rather than direct filesystem authority.' },
        { title: 'Evidence before completion', text: 'The loop uses bounded corrective retries for malformed calls or unsupported completion claims. Edit tasks require write evidence, diagnostics, and validation before a successful final response. Repeated model-protocol failures are surfaced as errors.' },
        { title: 'Webview isolation', text: 'A nonce-based Content Security Policy and validated message protocol separate the sidebar from the host. The webview has no direct network or filesystem access, and model text is escaped before its Markdown presentation.' }
      ],
      files: ['vscode-extension/src/agentLoop.ts', 'vscode-extension/src/toolRegistry.ts', 'vscode-extension/src/workspacePolicy.ts', 'vscode-extension/src/safeExecution.ts', 'vscode-extension/src/sidebarHtml.ts']
    },
    {
      id: 'infrastructure', title: 'Storage, caching & ingestion jobs',
      intro: 'Persistent application records, cached results, and background work have distinct responsibilities.',
      points: [
        { title: 'PostgreSQL and TypeORM', text: 'Users, chat sessions, messages, chunks, knowledge sources, user-source associations, and ingestion-job records are represented by entities. Explicit migrations manage schema changes; the application disables automatic schema synchronization.' },
        { title: 'Redis caching', text: 'Redis caches reusable results such as embeddings and conversation context. Cache failures can fall back to PostgreSQL-backed retrieval, so Redis is not the only copy of saved conversations or document records.' },
        { title: 'BullMQ ingestion', text: 'File, website, and sitemap processing run through a Redis-backed BullMQ queue with workers and persistent job status. New queued ingestion requires Redis availability, even though existing stored knowledge can remain retrievable during a cache outage.' },
        { title: 'Supporting services', text: 'Docker Compose defines local PostgreSQL and Redis services. Health endpoints expose service state, while web ingestion includes URL and response bounds to limit external retrieval.' }
      ],
      files: ['backend/src/entities/', 'backend/src/database/migrations/', 'backend/src/cache/redis-cache.service.ts', 'backend/src/rag/ingestion-queue.service.ts', 'compose.yaml']
    },
    {
      id: 'development', title: 'Build workflow & lessons learned',
      intro: 'The project brings together frontend delivery, backend data flows, model integration, and editor tooling. Each part needs its own checks, followed by a real connected workflow.',
      points: [
        { title: 'Local development', text: 'Configure the backend for your local database and model services, apply the database migrations, and start PostgreSQL, Redis, and Ollama. The root npm run start:dev script starts the Angular frontend and NestJS backend together.' },
        { title: 'Extension development', text: 'Install the extension dependencies, open the vscode-extension package in VS Code, and launch an Extension Development Host with F5. Sign in and exercise both Ask and Agent against the running backend before packaging and installing the VSIX.' },
        { title: 'What needs connected testing', text: 'Builds and unit tests check code-level behavior. A complete workflow also exercises sign-in, streaming, document ingestion and retrieval, ownership across two users, Local Only routing, approved edits, cancellation, and history reload.' },
        { title: 'Engineering lessons', text: 'Model discovery order is not a user preference. Small retrieval result sets can omit important document details. Provider-specific streaming must preserve prepared context. An agent’s completion claim needs workspace evidence. These constraints shaped the routing, retrieval, and validation layers.' }
      ],
      files: ['package.json', 'backend/package.json', 'frontend/package.json', 'vscode-extension/package.json', 'vscode-extension/README.md']
    }
  ];
}
