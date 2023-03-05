using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using TMPro;
using UnityEngine.InputSystem;
using System;
using UnityEngine.EventSystems;

public class ChatManager : MonoBehaviourPunCallbacks
{
    public GameObject m_Content;
    public TMP_InputField m_inputField;

    PhotonView photonview;

    GameObject m_ContentText;

    string m_strUserName;

    public Boolean chatmode = false;
    public GameObject mode;
 
  
    void Start()
    {
       
        m_ContentText = m_Content.transform.GetChild(0).gameObject;
        photonview = GetComponent<PhotonView>();
        // m_inputField.enabled = false;

        setUnityTrue();


    }

    void Update()
    {

        

    }
    
    public override void OnJoinedRoom()
    {
         
        AddChatMessage(PhotonNetwork.LocalPlayer.NickName+" 가 입장했습니다.");
    }

    public void OnEndEditEvent()
    {
        Debug.Log("쓰기!");
        if (Input.GetKeyDown(KeyCode.Return))
        {
            string strMessage = m_strUserName + " : " + m_inputField.text;

            photonview.RPC("RPC_Chat", RpcTarget.All, strMessage);
            m_inputField.text = "";
        }
    }
    public void submit()
    {
        string strMessage = PhotonNetwork.LocalPlayer.NickName + " : " + m_inputField.text;
        
        photonview.RPC("RPC_Chat", RpcTarget.All, strMessage);
        m_inputField.text = "";
    }
    void AddChatMessage(string message)
    {
        GameObject goText = Instantiate(m_ContentText, m_Content.transform);

        goText.GetComponent<TextMeshProUGUI>().text = message;
        m_Content.GetComponent<RectTransform>().anchoredPosition = Vector3.zero;
         

    }
     
    [PunRPC]
    void RPC_Chat(string message)
    {
        AddChatMessage(message);
    }

    public void SwitchChatMode()
    {
         
        //모든 플레이어 중에서
        
        GameObject[] players = GameObject.FindGameObjectsWithTag("Player");
        for (int i = 0; i < players.Length; i++)
        {    
            if (players[i].GetComponent<PhotonView>().IsMine)
            {     
                players[i].GetComponent<PlayerInput>().enabled = chatmode;
                players[i].GetComponent<CameraSetup>().enabled = chatmode;
            }
        } 
        chatmode = !chatmode;
       // setModeText();
    }
     
    void setModeText()
    {
        if(chatmode)
        {
            mode.GetComponent<TextMeshProUGUI>().text = "폰/채팅 모드";
            m_inputField.enabled= true;
        }
        else
        {
            mode.GetComponent<TextMeshProUGUI>().text = "플레이모드";
            m_inputField.enabled = false;
        }
    }

    public void onEdit()
    {
        setUnityFalse();
    }
    public void onEditEnd()
    {
        setUnityTrue();
    }

    public void setUnityFalse()
    {
#if (UNITY_WEBGL == true && UNITY_EDITOR == false)
     WebGLInput.captureAllKeyboardInput = false ; 
#endif
    }

    public void setUnityTrue()
    {
#if (UNITY_WEBGL == true && UNITY_EDITOR == false)
     WebGLInput.captureAllKeyboardInput = true; 
#endif
    }

}