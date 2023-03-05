using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Unity.VisualScripting;
using System;

public class Player : MonoBehaviourPunCallbacks
{
    private Animator animator;
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        if (photonView!= null)
        {
            if (photonView.IsMine)
            {
                animator = GetComponent<Animator>();
                Dance1();
                Dance2();
                Joyful();
                Kick();
                Wave();
                Dying();
                Sit();
            }
        }

    }

    void Dance1()
    {
        if (Input.GetKey(KeyCode.Z))
        {
            animator.SetBool("isDance1", true);
        }
        else if (Input.anyKey)
        {
            animator.SetBool("isDance1", false);
        }
    }

    void Dance2()
    {
        if (Input.GetKey(KeyCode.X))
        {
            animator.SetBool("isDance2", true);
        }
        else if (Input.anyKey)
        {
            animator.SetBool("isDance2", false);
        }
    }

    void Joyful()
    {
        if (Input.GetKey(KeyCode.C))
        {
            animator.SetBool("isJoyful", true);
        }
        else if (Input.anyKey)
        {
            animator.SetBool("isJoyful", false);
        }
    }

    void Kick()
    {
        if (Input.GetKey(KeyCode.V))
        {
            animator.SetBool("isKick", true);
        }
        else if (Input.anyKey)
        {
            animator.SetBool("isKick", false);
        }
    }

    void Wave()
    {
        if (Input.GetKey(KeyCode.B))
        {
            animator.SetBool("isWave", true);
        }
        else if (Input.anyKey)
        {
            animator.SetBool("isWave", false);
        }
    }

    void Dying()
    {
        if (Input.GetKey(KeyCode.N))
        {
            animator.SetBool("isDying", true);
        }
        else if (Input.anyKey)
        {
            animator.SetBool("isDying", false);
        }
    }


    void Sit()
    {
        if (Input.GetKey(KeyCode.Q))
        {
            animator.SetBool("isSit", true);
        }
        else if (Input.anyKey)
        {
            animator.SetBool("isSit", false);
        }
    }


}
