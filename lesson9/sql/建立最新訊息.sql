CREATE TABLE public.最新訊息 (
	id smallserial NOT NULL,
	主題 text NOT NULL,
	上版日期 date NULL,
	內容 text NULL,
	CONSTRAINT 最新訊息_pk PRIMARY KEY (id)
);