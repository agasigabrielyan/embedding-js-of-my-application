<?php
AddEventHandler("main", "OnBeforeProlog", "MyOnBeforePrologHandler", 50);

function MyOnBeforePrologHandler()
{
    CJSCore::RegisterExt(
        "embedding",
        array(
            "js" => "/local/embedding/embedding.js",
            "css" => "/local/embedding/embedding.css",
            "rel" => Array("ajax", "popup", "ls", "fx"),
            "skip_core" => false,
        )
    );

    CJSCore::Init('embedding');
}
