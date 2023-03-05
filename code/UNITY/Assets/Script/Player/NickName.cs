using Photon.Pun;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NickName : MonoBehaviourPunCallbacks 
{

    public TextMesh nameField;
    
    // Start is called before the first frame update
    void Start()
    {
      
        setPlayerName();

    }

    // Update is called once per frame
    void Update()
    {
        
    }
    
    void setPlayerName()
    {
        if (photonView.IsMine)
        {
            nameField.text = PhotonNetwork.NickName;      
        }
        else
        {
            nameField.text = photonView.Owner.NickName;
        }

    }
    
}
