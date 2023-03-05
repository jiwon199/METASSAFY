using Photon.Pun;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using TMPro;
using UnityEngine;
using UnityEngine.InputSystem;

public class videoRoom : MonoBehaviourPunCallbacks
{
    // Start is called before the first frame update
    public GameObject [] enterBtn;
    public TMP_InputField m_inputField;

    string now;
     
    [DllImport("__Internal")]
    private static extern void openPhone(string mode);
    void Start()
    {
        now = "";
    }
    private void OnTriggerEnter(Collider other)

    {

        
        if (other.gameObject.GetComponent<PhotonView>().IsMine)
        {
            enterBtn[findIdx()].SetActive(true);
        }
        
       
    }
    private void OnTriggerExit(Collider other)
    {
        
        if (other.gameObject.GetComponent<PhotonView>().IsMine)
        {
            enterBtn[findIdx()].SetActive(false);
        }
    }
    private int findIdx()
    {
        int idx = 0;
        if (this.gameObject.name == "videoRoom2") idx = 1;
        else if (this.gameObject.name == "videoRoom3") idx = 2;
        return idx;
    }
    public void stopWithoutVideo()
    {
        GameObject[] players = GameObject.FindGameObjectsWithTag("Player");
        for (int i = 0; i < players.Length; i++)
        {   
            if (players[i].GetComponent<PhotonView>().IsMine)
            {
                players[i].GetComponent<PlayerInput>().enabled=false;
            }
        }

        //채팅 끄기
        m_inputField.enabled= false;

    }

    public void restartUntiy()
    {

        GameObject[] players = GameObject.FindGameObjectsWithTag("Player");
        for (int i = 0; i < players.Length; i++)
        {    
            if (players[i].GetComponent<PhotonView>().IsMine)
            {
                players[i].GetComponent<PlayerInput>().enabled = true;
            }
        }

        m_inputField.enabled = true;

    }
    // Update is called once per frame
    void Update()
    {
        
    }
    public void enterVideo(string name)
    {
        
        stopWithoutVideo();
        //리액트 측에 비디오라는 메세지 보내기
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    openPhone (name);
#endif
    }
}
